import React, { createContext, useContext, useState, useEffect , useCallback } from 'react';
import { syncApprendreFromDb } from '../utils/storage';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                return JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user:', e);
                return null;
            }
        }
        return null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(false);

    const _clearSession = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, []);

    const refreshUser = useCallback(async () => {
        if (!localStorage.getItem('token')) return null;

        const res = await api.get('/profile');

        if (res.data?.success && res.data?.data) {
            const fresh = {
                ...(JSON.parse(localStorage.getItem('user') || '{}')),
                ...res.data.data,
            };
            setUser(fresh);
            localStorage.setItem('user', JSON.stringify(fresh));
            return fresh;
        }

        return null;
    }, []);

    // Initial mount check (in case localStorage was cleared between ticks or we need side effects)
    useEffect(() => {
        if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
            _clearSession();
        } else {
            // Restored session: re-hydrate Apprendre state from the database so
            // the cache reflects the source of truth (e.g. after a device switch).
            syncApprendreFromDb().catch(() => {});
        }
        setLoading(false);
    }, [_clearSession]);

    // After token is set, refresh profile from backend to get latest data (image, bio, ville)
    useEffect(() => {
        if (!token) return;
        refreshUser()
            .catch(() => {/* silent — token may have expired */});
    }, [token, refreshUser]);

    const login = useCallback((userData, userToken) => {
        if (!userData || !userToken) {
            console.error('Missing user or token');
            return;
        }
        const userWithRole = { ...userData, role: userData.role || 'user' };
        setUser(userWithRole);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userWithRole));

        // Database-first: pull this user's Apprendre progress/favorites/saved content
        // from the DB into the local cache. Fire-and-forget so login stays instant.
        syncApprendreFromDb().catch(() => {});
    }, []);

    const logout = useCallback(() => _clearSession(), [_clearSession]);

    /**
     * Update the current user's profile.
     * Accepts: { name, ville, bio, photo (base64 dataURL) }
     */
    const updateUser = useCallback(async (profileData) => {
        const payload = {};
        if (profileData.name  !== undefined) payload.name  = profileData.name;
        if (profileData.ville !== undefined) payload.ville = profileData.ville;
        if (profileData.bio   !== undefined) payload.bio   = profileData.bio;
        if (profileData.photo !== undefined) payload.photo = profileData.photo;

        const res = await api.post('/profile', payload);

        if (res.data?.success && res.data?.data) {
            const updated = { ...user, ...res.data.data };
            setUser(updated);
            localStorage.setItem('user', JSON.stringify(updated));
        }

        return res.data;
    }, [user]);

    const isAuthenticated = !!user && !!token;
    const isAdmin = useCallback(() => user?.role === 'admin', [user?.role]);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            loading,
            isAuthenticated,
            isAdmin,
            updateUser,
            refreshUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}

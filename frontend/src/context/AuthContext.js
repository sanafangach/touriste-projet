import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } catch (e) {
                console.error('Error parsing user:', e);
                _clearSession();
            }
        }
        setLoading(false);
    }, []);

    // After token is set, refresh profile from backend to get latest data (image, bio, ville)
    useEffect(() => {
        if (!token) return;
        api.get('/profile')
            .then(res => {
                if (res.data?.success && res.data?.data) {
                    const fresh = { ...(JSON.parse(localStorage.getItem('user') || '{}')), ...res.data.data };
                    setUser(fresh);
                    localStorage.setItem('user', JSON.stringify(fresh));
                }
            })
            .catch(() => {/* silent — token may have expired */});
    }, [token]);

    const _clearSession = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const login = (userData, userToken) => {
        if (!userData || !userToken) {
            console.error('Missing user or token');
            return;
        }
        const userWithRole = { ...userData, role: userData.role || 'user' };
        setUser(userWithRole);
        setToken(userToken);
        localStorage.setItem('token', userToken);
        localStorage.setItem('user', JSON.stringify(userWithRole));
    };

    const logout = () => _clearSession();

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
    const isAdmin = () => user?.role === 'admin';

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
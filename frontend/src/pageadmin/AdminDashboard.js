// src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../components/accueil/LanguageContext';

import api from '../services/api';

import ConfirmDialog from '../components/common/ConfirmDialog';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';
import StatsCards from '../components/admin/StatsCards';
import UsersTable from '../components/admin/UsersTable';

import translations from '../components/admin/translations';

import '../components/css/AdminDashboard.css';

function AdminDashboard() {
    const { user, logout, isAdmin } = useAuth();
    const { lang, isRTL } = useLanguage();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        total_users: 0,
        total_admins: 0,
        total_regular_users: 0
    });

    const [logoutConfirmOpen, setLogoutConfirmOpen] =
        useState(false);

    const currentLang = translations[lang];

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
            return;
        }

        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, statsRes] =
                await Promise.all([
                    api.get('/admin/users'),
                    api.get('/admin/stats')
                ]);

            setUsers(usersRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (
            !window.confirm(
                currentLang.confirmDelete
            )
        ) {
            return;
        }

        try {
            await api.delete(
                `/admin/users/${userId}`
            );

            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleRole = async (
        userId,
        currentRole
    ) => {
        const newRole =
            currentRole === 'admin'
                ? 'user'
                : 'admin';

        try {
            await api.put(
                `/admin/users/${userId}/role`,
                {
                    role: newRole
                }
            );

            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {}

        setLogoutConfirmOpen(false);

        logout();

        navigate('/');
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div
            className={`admin-dashboard ${
                isRTL ? 'rtl' : ''
            }`}
        >
            <AdminSidebar
                user={user}
                currentLang={currentLang}
                onLogout={() =>
                    setLogoutConfirmOpen(true)
                }
            />

            <main className="admin-main">
                <AdminHeader
                    user={user}
                    currentLang={currentLang}
                    lang={lang}
                />

                <StatsCards
                    stats={stats}
                    currentLang={currentLang}
                />

                <UsersTable
                    users={users}
                    user={user}
                    currentLang={currentLang}
                    lang={lang}
                    deleteUser={deleteUser}
                    toggleRole={toggleRole}
                />
            </main>

            <ConfirmDialog
                open={logoutConfirmOpen}
                title={currentLang.logoutTitle}
                message={currentLang.logoutMessage}
                cancelLabel={currentLang.cancel}
                confirmLabel={
                    currentLang.confirmLogout
                }
                onCancel={() =>
                    setLogoutConfirmOpen(false)
                }
                onConfirm={handleLogout}
                isRTL={isRTL}
            />
        </div>
    );
}

export default AdminDashboard;
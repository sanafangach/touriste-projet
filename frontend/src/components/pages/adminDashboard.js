import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Shield, Trash2, UserCheck, LogOut, BarChart3, Crown, TrendingUp, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../accueil/LanguageContext';
import api from '../../services/api';
import '../css/AdminDashboard.css';

function AdminDashboard() {
    const { user, logout, isAdmin } = useAuth();
    const { lang, isRTL } = useLanguage();
    const navigate = useNavigate();
    
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ total_users: 0, total_admins: 0, total_regular_users: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin()) {
            navigate('/');
            return;
        }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, statsRes] = await Promise.all([
                api.get('/admin/users'),
                api.get('/admin/stats')
            ]);
            setUsers(usersRes.data);
            setStats(statsRes.data);
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (!window.confirm(at[lang].confirmDelete)) return;
        
        try {
            await api.delete(`/admin/users/${userId}`);
            fetchData();
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const toggleRole = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            fetchData();
        } catch (err) {
            console.error('Error toggling role:', err);
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {}
        logout();
        navigate('/');
    };

    // Admin translations
    const at = {
        FR: {
            dashboard: 'Tableau de bord',
            totalUsers: 'Utilisateurs',
            admins: 'Admins',
            regularUsers: 'Utilisateurs',
            userList: 'Liste des utilisateurs',
            email: 'Email',
            name: 'Nom',
            role: 'Rôle',
            actions: 'Actions',
            confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            makeAdmin: 'Rendre admin',
            removeAdmin: 'Retirer admin',
            logout: 'Déconnexion',
            adminPanel: 'Panneau Admin',
            welcome: 'Bienvenue'
        },
        EN: {
            dashboard: 'Dashboard',
            totalUsers: 'Total Users',
            admins: 'Admins',
            regularUsers: 'Users',
            userList: 'User List',
            email: 'Email',
            name: 'Name',
            role: 'Role',
            actions: 'Actions',
            confirmDelete: 'Are you sure you want to delete this user?',
            makeAdmin: 'Make Admin',
            removeAdmin: 'Remove Admin',
            logout: 'Logout',
            adminPanel: 'Admin Panel',
            welcome: 'Welcome'
        },
        AR: {
            dashboard: 'لوحة التحكم',
            totalUsers: 'إجمالي المستخدمين',
            admins: 'المشرفين',
            regularUsers: 'المستخدمين',
            userList: 'قائمة المستخدمين',
            email: 'البريد',
            name: 'الاسم',
            role: 'الدور',
            actions: 'الإجراءات',
            confirmDelete: 'هل أنت متأكد من حذف هذا المستخدم؟',
            makeAdmin: 'جعله مشرفاً',
            removeAdmin: 'إزالة الإشراف',
            logout: 'تسجيل الخروج',
            adminPanel: 'لوحة الإدارة',
            welcome: 'أهلاً بك'
        }
    };

    const currentLang = at[lang];

    if (loading) {
        return (
            <div className="admin-loading">
                <div className="loading-spinner"></div>
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className={`admin-dashboard ${isRTL ? 'rtl' : ''}`}>
            {/* SIDEBAR - Glassmorphism like home menu */}
            <aside className="admin-sidebar">
                <div className="sidebar-gradient"></div>
                
                <div className="admin-logo">
                    <div className="logo-icon">
                        <Crown size={28} />
                    </div>
                    <div className="logo-text">
                        <span className="logo-brand">AMUDUX</span>
                        <span className="logo-tag">{currentLang.adminPanel}</span>
                    </div>
                </div>
                
                <nav className="admin-nav">
                    <button className="nav-item active">
                        <div className="nav-icon">
                            <BarChart3 size={18} />
                        </div>
                        <span>{currentLang.dashboard}</span>
                    </button>
                    
                    <div className="nav-divider"></div>
                    
                    <button className="nav-item logout-item" onClick={handleLogout}>
                        <div className="nav-icon">
                            <LogOut size={18} />
                        </div>
                        <span>{currentLang.logout}</span>
                    </button>
                </nav>

                {/* User card at bottom */}
                <div className="sidebar-user">
                    <div className="user-avatar">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name}</span>
                        <span className="user-role">
                            <Shield size={12} />
                            {user?.role}
                        </span>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="admin-main">
                {/* HEADER */}
                <header className="admin-header">
                    <div className="header-title">
                        <h1>{currentLang.dashboard}</h1>
                        <p>{currentLang.welcome}, {user?.name}</p>
                    </div>
                    <div className="header-date">
                        {new Date().toLocaleDateString(lang === 'FR' ? 'fr-FR' : lang === 'AR' ? 'ar-SA' : 'en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                </header>

                {/* STATS CARDS - Glassmorphism like home */}
                <div className="stats-grid">
                    <div className="stat-card total-card">
                        <div className="stat-icon-bg">
                            <Users size={22} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total_users || 0}</h3>
                            <p>{currentLang.totalUsers}</p>
                        </div>
                        <div className="stat-trend">
                            <TrendingUp size={14} />
                        </div>
                    </div>

                    <div className="stat-card admin-card">
                        <div className="stat-icon-bg">
                            <Crown size={22} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total_admins || 0}</h3>
                            <p>{currentLang.admins}</p>
                        </div>
                        <div className="stat-trend up">
                            <TrendingUp size={14} />
                        </div>
                    </div>

                    <div className="stat-card user-card">
                        <div className="stat-icon-bg">
                            <UserPlus size={22} />
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total_regular_users || 0}</h3>
                            <p>{currentLang.regularUsers}</p>
                        </div>
                        <div className="stat-trend">
                            <TrendingUp size={14} />
                        </div>
                    </div>
                </div>

                {/* USERS TABLE - Clean glass style */}
                <div className="users-section">
                    <div className="section-header">
                        <h2>{currentLang.userList}</h2>
                        <div className="section-count">{users.length} {lang === 'FR' ? 'utilisateurs' : lang === 'AR' ? 'مستخدم' : 'users'}</div>
                    </div>
                    
                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>{currentLang.name}</th>
                                    <th>{currentLang.email}</th>
                                    <th>{currentLang.role}</th>
                                    <th>{currentLang.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className={u.id === user?.id ? 'current-user' : ''}>
                                        <td className="id-cell">#{u.id}</td>
                                        <td>
                                            <div className="user-cell">
                                                <div className="cell-avatar">
                                                    {u.name?.[0]?.toUpperCase()}
                                                </div>
                                                <span>{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="email-cell">{u.email}</td>
                                        <td>
                                            <span className={`role-badge ${u.role}`}>
                                                {u.role === 'admin' && <Crown size={10} />}
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button 
                                                className={`action-btn role-btn ${u.role === 'admin' ? 'is-admin' : ''}`}
                                                onClick={() => toggleRole(u.id, u.role)}
                                                title={u.role === 'admin' ? currentLang.removeAdmin : currentLang.makeAdmin}
                                                disabled={u.id === user?.id}
                                            >
                                                <Shield size={14} />
                                            </button>
                                            <button 
                                                className="action-btn delete-btn"
                                                onClick={() => deleteUser(u.id)}
                                                disabled={u.id === user?.id}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;
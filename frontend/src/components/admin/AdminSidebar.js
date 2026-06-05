import React from 'react';
import { BarChart3, Crown, LogOut, Shield } from 'lucide-react';

function AdminSidebar({ user, currentLang, onLogout }) {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-gradient"></div>

            <div className="admin-logo">
                <div className="logo-icon">
                    <Crown size={28} />
                </div>

                <div className="logo-text">
                    <span className="logo-brand">AMUDUX</span>
                    <span className="logo-tag">
                        {currentLang.adminPanel}
                    </span>
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

                <button
                    className="nav-item logout-item"
                    onClick={onLogout}
                >
                    <div className="nav-icon">
                        <LogOut size={18} />
                    </div>

                    <span>{currentLang.logout}</span>
                </button>
            </nav>

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
    );
}

export default AdminSidebar;
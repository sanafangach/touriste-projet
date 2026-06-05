import React from 'react';
import {
    Users,
    Crown,
    UserPlus,
    TrendingUp
} from 'lucide-react';

function StatsCards({ stats, currentLang }) {
    return (
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

                <div className="stat-trend">
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
    );
}

export default StatsCards;
import React from 'react';

function AdminHeader({ user, currentLang, lang }) {
    return (
        <header className="admin-header">
            <div className="header-title">
                <h1>{currentLang.dashboard}</h1>

                <p>
                    {currentLang.welcome}, {user?.name}
                </p>
            </div>

            <div className="header-date">
                {new Date().toLocaleDateString(
                    lang === 'FR'
                        ? 'fr-FR'
                        : lang === 'AR'
                        ? 'ar-SA'
                        : 'en-US',
                    {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }
                )}
            </div>
        </header>
    );
}

export default AdminHeader;
import React, { useEffect } from 'react';
import '../css/GoogleCallback.css';
import { useLanguage } from '../accueil/LanguageContext';

function AuthLoader({ message }) {
    const { isRTL } = useLanguage();

    useEffect(() => {
        const savedDark = localStorage.getItem('app-dark-mode') === 'true';
        document.documentElement.classList.toggle('dark', savedDark);
    }, []);

    return (
        <div
            className={`google-callback-bridge ${isRTL ? 'rtl' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            role="status"
            aria-live="polite"
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}
        >
            <div className="google-callback-bridge-content">
                <div className="google-callback-brand">AMUDUX</div>
                <div className="google-callback-loader compact" aria-hidden="true">
                    <div className="google-callback-loader-inner"></div>
                </div>
                {message && (
                    <div style={{ color: 'var(--google-callback-title)', marginTop: '15px', fontSize: '15px', fontWeight: '500' }}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthLoader;

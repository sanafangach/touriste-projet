import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../accueil/LanguageContext';
import api from '../../services/api';
import '../css/GoogleCallback.css';

const callbackText = {
    FR: {
        title: 'Finalisation de la connexion',
        description: 'Votre compte est verifie en toute securite. Cela ne prendra qu\'un instant.',
        accountCreated: 'Inscription reussie.',
        loggedIn: 'Connexion reussie.',
        redirecting: 'Redirection vers votre espace...',
    },
    EN: {
        title: 'Finalizing sign-in',
        description: 'Your account is being verified securely. This will only take a moment.',
        accountCreated: 'Registration successful.',
        loggedIn: 'Logged in successfully.',
        redirecting: 'Redirecting to your account...',
    },
    AR: {
        title: 'جاري إتمام تسجيل الدخول',
        description: 'يتم التحقق من حسابك بشكل آمن. لن يستغرق الأمر سوى لحظة.',
        accountCreated: 'تم التسجيل بنجاح.',
        loggedIn: 'تم تسجيل الدخول بنجاح.',
    },
};

function GoogleCallback() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const { lang, isRTL } = useLanguage();
    const hasRun = useRef(false);
    const text = callbackText[lang] || callbackText.EN;
    useEffect(() => {
        const savedDark = localStorage.getItem('app-dark-mode') === 'true';
        document.documentElement.classList.toggle('dark', savedDark);
    }, []);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const handleCallback = async () => {
            const urlParams = new URLSearchParams(location.search);
            const code = urlParams.get('code');
            const googleError = urlParams.get('error');

            if (!code) {
                navigate('/login?error=' + encodeURIComponent(googleError || 'No authorization code returned from Google.'));
                return;
            }

            try {
                const response = await api.post('/auth/google/callback', {
                    code,
                    redirect_uri: window.location.origin + '/auth/google/callback'
                });

                if (response.data.success) {
                    login(response.data.user, response.data.token);
                    const authMessage = response.data.is_new_user ? text.accountCreated : text.loggedIn;

                    navigate('/', {
                        replace: true,
                        state: {
                            authMessage
                        }
                    });
                } else {
                    navigate('/login?error=' + encodeURIComponent(response.data.message));
                }
            } catch (error) {
                navigate('/login?error=' + encodeURIComponent(
                    error.response?.data?.message || error.message
                ));
            }
        };

        handleCallback();
    }, [location.search, login, navigate, text]);

    return (
        <div
            className={`google-callback-bridge ${isRTL ? 'rtl' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
            role="status"
            aria-live="polite"
        >
            <div className="google-callback-bridge-content">
                <div className="google-callback-brand">AMUDUX</div>
                <div className="google-callback-loader compact" aria-hidden="true">
                    <div className="google-callback-loader-inner"></div>
                </div>
            </div>
        </div>
    );
}

export default GoogleCallback;

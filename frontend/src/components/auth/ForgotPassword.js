import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import api from '../../services/api';
import '../css/Login.css';

function ForgotPassword() {
    const { lang, isRTL } = useLanguage();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const lt = {
        FR: {
            title: 'Mot de passe oublié ?',
            subtitle: 'Entrez votre email pour recevoir un lien de réinitialisation',
            email: 'Email',
            send: 'Envoyer le lien',
            backToLogin: 'Retour à la connexion',
            success: 'Lien envoyé ! Vérifiez votre email.',
            error: 'Erreur lors de l\'envoi'
        },
        EN: {
            title: 'Forgot password?',
            subtitle: 'Enter your email to receive a reset link',
            email: 'Email',
            send: 'Send link',
            backToLogin: 'Back to login',
            success: 'Link sent! Check your email.',
            error: 'Error sending email'
        },
        AR: {
            title: 'نسيت كلمة المرور؟',
            subtitle: 'أدخل بريدك الإلكتروني لاستلام رابط إعادة التعيين',
            email: 'البريد الإلكتروني',
            send: 'إرسال الرابط',
            backToLogin: 'العودة لتسجيل الدخول',
            success: 'تم إرسال الرابط! تحقق من بريدك.',
            error: 'خطأ في الإرسال'
        }
    };

    const t = lt[lang];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError('Email invalide');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/forgot-password', { email });
            setSuccess(t.success);
        } catch (err) {
            setError(err.response?.data?.message || t.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
            <div className="login-container">
                <div className="login-left">
                    <div className="login-left-overlay"></div>
                    <div className="login-branding">
                        <div className="login-logo">AMUDUX</div>
                        <h1 className="login-tagline">
                            {lang === 'AR' ? 'استعادة كلمة المرور' : 
                             lang === 'FR' ? 'Réinitialisation' : 
                             'Password Reset'}
                        </h1>
                    </div>
                    <div className="login-decorative-circle circle-1"></div>
                    <div className="login-decorative-circle circle-2"></div>
                </div>

                <div className="login-right">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h2>{t.title}</h2>
                            <p className="login-subtitle">{t.subtitle}</p>
                        </div>

                        {error && (
                            <div className="login-error" style={{display:'flex',alignItems:'center',gap:'8px',justifyContent:'center'}}>
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}
                        {success && (
                            <div className="login-success" style={{display:'flex',alignItems:'center',gap:'8px',justifyContent:'center'}}>
                                <CheckCircle size={16} /> {success}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label><Mail size={16} className="label-icon" />{t.email}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <button type="submit" className="login-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : (
                                    <>{t.send} <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <p className="login-toggle">
                            <button onClick={() => navigate('/login')} className="toggle-btn">
                                {t.backToLogin}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
                            
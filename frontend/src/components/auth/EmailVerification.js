import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import api from '../../services/api';
import '../css/Login.css';

function EmailVerification() {
    const { lang, isRTL } = useLanguage();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const lt = {
        FR: {
            verifyEmail: 'Vérifier votre email',
            enterEmail: 'Entrez votre email',
            sendCode: 'Envoyer le code',
            invalidEmail: 'Email invalide',
            errorOccurred: 'Une erreur est survenue'
        },
        EN: {
            verifyEmail: 'Verify your email',
            enterEmail: 'Enter your email',
            sendCode: 'Send code',
            invalidEmail: 'Invalid email',
            errorOccurred: 'An error occurred'
        },
        AR: {
            verifyEmail: 'تحقق من بريدك الإلكتروني',
            enterEmail: 'أدخل بريدك الإلكتروني',
            sendCode: 'إرسال الرمز',
            invalidEmail: 'بريد إلكتروني غير صالح',
            errorOccurred: 'حدث خطأ'
        }
    };

    const t = lt[lang];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setError(t.invalidEmail);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/send-verification-code', { email });
            
            // Redirect l page dial verification code
            navigate('/verify-code', { state: { email } });
            
        } catch (err) {
            setError(err.response?.data?.message || t.errorOccurred);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
            <div className="login-container">
                {/* LEFT SIDE */}
                <div className="login-left">
                    <div className="login-left-overlay"></div>
                    <div className="login-branding">
                        <div className="login-logo">AMUDUX</div>
                        <h1 className="login-tagline">
                            {lang === 'AR' ? 'تحقق من حسابك' : 
                             lang === 'FR' ? 'Vérifiez votre compte' : 
                             'Verify your account'}
                        </h1>
                    </div>
                    <div className="login-decorative-circle circle-1"></div>
                    <div className="login-decorative-circle circle-2"></div>
                </div>

                {/* RIGHT SIDE */}
                <div className="login-right">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h2>{t.verifyEmail}</h2>
                        </div>

                        {error && (
                            <div className="login-error" style={{display:'flex',alignItems:'center',gap:'8px',justifyContent:'center'}}>
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label>
                                    <Mail size={16} className="label-icon" />
                                    {t.enterEmail}
                                </label>
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
                                    <>{t.sendCode} <ArrowRight size={18} /></>
                                )}
                            </button>
                        </form>

                        <p className="login-toggle">
                            {lang === 'AR' ? 'لديك حساب بالفعل؟' : 
                             lang === 'FR' ? 'Déjà un compte ?' : 
                             'Already have an account?'}{' '}
                            <button onClick={() => navigate('/login')} className="toggle-btn">
                                {lang === 'AR' ? 'سجل الدخول' : 
                                 lang === 'FR' ? 'Se connecter' : 
                                 'Sign In'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmailVerification;
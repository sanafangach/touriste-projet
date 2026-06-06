import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AuthLoader from './AuthLoader';
import '../css/Login.css';

function VerifyCode() {
    const { lang, isRTL } = useLanguage();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state || {};
    const email = userData.email || '';
    const initialResendSeconds = 60;

    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendSeconds, setResendSeconds] = useState(initialResendSeconds);
    const [authSuccess, setAuthSuccess] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const lt = {
        FR: {
            verifyCode: 'Vérifier le code',
            enterCode: 'Entrez le code de vérification',
            codeSent: 'Code envoyé à',
            verify: 'Vérifier',
            invalidCode: 'Code invalide ou expiré',
            verified: 'Inscription réussie ! Redirection...',
            registrationSuccessful: 'Inscription reussie.',
            resend: 'Renvoyer le code'
        },
        EN: {
            verifyCode: 'Verify Code',
            enterCode: 'Enter verification code',
            codeSent: 'Code sent to',
            verify: 'Verify',
            invalidCode: 'Invalid or expired code',
            verified: 'Registration successful! Redirecting...',
            registrationSuccessful: 'Registration successful.',
            resend: 'Resend code'
        },
        AR: {
            verifyCode: 'تحقق من الرمز',
            enterCode: 'أدخل رمز التحقق',
            codeSent: 'تم إرسال الرمز إلى',
            verify: 'تحقق',
            invalidCode: 'رمز غير صالح أو منتهي الصلاحية',
            verified: 'تم التسجيل بنجاح! جاري التحويل...',
            registrationSuccessful: 'تم التسجيل بنجاح.',
            resend: 'إعادة الإرسال'
        }
    };

    const t = lt[lang];
    const resendText = {
        ready: lang === 'FR' ? 'Vous pouvez renvoyer un nouveau code.' : lang === 'AR' ? 'يمكنك اعادة ارسال رمز جديد.' : 'You can resend a new code.',
        waiting: lang === 'FR' ? 'Nouveau code disponible dans' : lang === 'AR' ? 'رمز جديد متاح بعد' : 'New code available in',
        waitError: lang === 'FR' ? 'Veuillez attendre la fin du minuteur avant de renvoyer le code.' : lang === 'AR' ? 'يرجى انتظار انتهاء المؤقت قبل اعادة الارسال.' : 'Please wait for the timer to finish before resending the code.',
        resent: lang === 'FR' ? 'Code renvoye !' : lang === 'AR' ? 'تمت اعادة ارسال الرمز!' : 'Code resent!'
    };

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (resendSeconds <= 0) {
            return undefined;
        }

        const timer = setInterval(() => {
            setResendSeconds((seconds) => Math.max(0, seconds - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [resendSeconds]);

    const formatTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code || code.length !== 6) {
            setError(t.invalidCode);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/register-verify', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                code: code
            });

            const { user, token } = response.data;

            if (!user || !token) {
                setError('Erreur: données manquantes du serveur');
                return;
            }

            // Auto-login
            login(user, token);

            setAuthSuccess(true);
            setTimeout(() => {
                navigate('/', {
                    replace: true,
                    state: {
                        authMessage: t.registrationSuccessful
                    }
                });
            }, 1500);
            return;

        } catch (err) {
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const firstError = Object.values(errors)[0]?.[0];
                setError(firstError || t.invalidCode);
            } else {
                setError(err.response?.data?.message || t.invalidCode);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendSeconds > 0) {
            setError(resendText.waitError);
            return;
        }

        setResending(true);
        setError('');

        try {
            const response = await api.post('/register-send-code', {
                name: userData.name,
                email: userData.email,
                password: userData.password,
                password_confirmation: userData.password
            });
            setCode('');
            setResendSeconds(60);

            setSuccess('Code renvoyé !');
        } catch (err) {
            const waitSeconds = err.response?.data?.wait_seconds;
            if (waitSeconds) {
                setResendSeconds(waitSeconds);
            }
            setError(err.response?.data?.message || 'Erreur');
        } finally {
            setResending(false);
        }
    };

    return (
        <>
            {authSuccess && <AuthLoader />}
            <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
                <div className="login-container">
                    <div className="login-left" style={{ position: 'relative' }}>
                        <button 
                            onClick={() => navigate(-1)}
                            style={{
                                position: 'absolute', top: '20px', left: isRTL ? 'auto' : '20px', right: isRTL ? '20px' : 'auto',
                                background: 'rgba(255, 255, 255, 0.2)', border: 'none', borderRadius: '50%',
                                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: 'white', zIndex: 10, backdropFilter: 'blur(4px)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                            title={lang === 'FR' ? 'Retour' : lang === 'AR' ? 'رجوع' : 'Back'}
                        >
                            {isRTL ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
                        </button>
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

                    <div className="login-right">
                        <div className="login-form-wrapper">
                            <div className="login-form-header">
                                <h2>{t.verifyCode}</h2>
                                <p className="login-subtitle">
                                    {t.codeSent} <strong>{email}</strong>
                                </p>
                            </div>

                            {error && (
                                <div className="login-error" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <AlertCircle size={16} /> {error}
                                </div>
                            )}
                            {success && (
                                <div className="login-success" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <CheckCircle size={16} /> {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label>
                                        <CheckCircle size={16} className="label-icon" />
                                        {t.enterCode}
                                    </label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="123456"
                                        maxLength={6}
                                        required
                                        style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '20px', fontWeight: '700' }}
                                    />
                                </div>
                                <button type="submit" className="login-submit" disabled={loading}>
                                    {loading ? <span className="spinner"></span> : (
                                        <>{t.verify} <ArrowRight size={18} /></>
                                    )}
                                </button>
                            </form>

                            <p className="login-toggle" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <span>
                                    {lang === 'AR' ? 'لم تستلم الرمز؟' :
                                        lang === 'FR' ? 'Vous n\'avez pas reçu le code ?' :
                                            'Didn\'t receive the code?'}
                                </span>
                                <button onClick={handleResend} className="toggle-btn" disabled={resending || resendSeconds > 0}>
                                    {resending ? <span className="spinner"></span> : resendSeconds > 0 ? (
                                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                            <span style={{ fontSize: '13px' }}>
                                                {lang === 'FR' ? 'Veuillez patienter' :
                                                    lang === 'AR' ? 'يرجى الانتظار' :
                                                        'Please wait'}
                                            </span>
                                            <span>{formatTimer(resendSeconds)}</span>
                                        </span>
                                    ) : (
                                        t.resend
                                    )}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyCode;

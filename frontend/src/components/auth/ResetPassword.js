import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, CheckCircle, Loader, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import api from '../../services/api';
import '../css/Login.css';

function ResetPassword() {
    const { lang, isRTL } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    const token = searchParams.get('token');
    const email = searchParams.get('email');
    
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [tokenValid, setTokenValid] = useState(false);

    const lt = {
        FR: {
            title: 'Nouveau mot de passe',
            subtitle: 'Créez un nouveau mot de passe sécurisé',
            password: 'Nouveau mot de passe',
            confirmPassword: 'Confirmer le mot de passe',
            reset: 'Modifier le mot de passe',
            success: 'Mot de passe modifié ! Redirection...',
            invalidLink: 'Lien invalide ou expiré',
            backToLogin: 'Retour à la connexion',
            passwordsDontMatch: 'Les mots de passe ne correspondent pas',
            passwordTooShort: 'Minimum 6 caractères'
        },
        EN: {
            title: 'New Password',
            subtitle: 'Create a new secure password',
            password: 'New password',
            confirmPassword: 'Confirm password',
            reset: 'Change password',
            success: 'Password changed! Redirecting...',
            invalidLink: 'Invalid or expired link',
            backToLogin: 'Back to login',
            passwordsDontMatch: 'Passwords do not match',
            passwordTooShort: 'Minimum 6 characters'
        },
        AR: {
            title: 'كلمة مرور جديدة',
            subtitle: 'أنشئ كلمة مرور جديدة آمنة',
            password: 'كلمة المرور الجديدة',
            confirmPassword: 'تأكيد كلمة المرور',
            reset: 'تغيير كلمة المرور',
            success: 'تم التغيير! جاري التحويل...',
            invalidLink: 'رابط غير صالح أو منتهي الصلاحية',
            backToLogin: 'العودة لتسجيل الدخول',
            passwordsDontMatch: 'كلمات المرور غير متطابقة',
            passwordTooShort: '6 أحرف على الأقل'
        }
    };

    const t = lt[lang];

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            if (!token || !email) {
                setError(t.invalidLink);
                setVerifying(false);
                return;
            }

            try {
                await api.post('/verify-reset-token', { token, email });
                setTokenValid(true);
            } catch (err) {
                setError(t.invalidLink);
            } finally {
                setVerifying(false);
            }
        };

        verifyToken();
    }, [token, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password.length < 6) {
            setError(t.passwordTooShort);
            return;
        }
        
        if (password !== passwordConfirmation) {
            setError(t.passwordsDontMatch);
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/reset-password', {
                email,
                token,
                password,
                password_confirmation: passwordConfirmation
            });
            
            setSuccess(t.success);
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err) {
            setError(err.response?.data?.message || t.invalidLink);
        } finally {
            setLoading(false);
        }
    };

    // Loading state while verifying token
    if (verifying) {
        return (
            <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
                <div className="login-container">
                    <div className="login-right" style={{width:'100%',justifyContent:'center'}}>
                        <Loader size={40} className="spinner" style={{margin:'0 auto',display:'block'}} />
                        <p style={{textAlign:'center',marginTop:'20px',color:'#666'}}>
                            {lang === 'AR' ? 'جاري التحقق...' : 'Vérification...'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid token state
    if (!tokenValid) {
        return (
            <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
                <div className="login-container">
                    <div className="login-left">
                        <div className="login-left-overlay"></div>
                        <div className="login-branding">
                            <div className="login-logo">AMUDUX</div>
                        </div>
                    </div>
                    <div className="login-right">
                        <div className="login-form-wrapper" style={{textAlign:'center'}}>
                            <AlertCircle size={48} style={{color:'#e74c3c',marginBottom:'20px'}} />
                            <h2 style={{color:'#e74c3c',marginBottom:'10px'}}>{error}</h2>
                            <p style={{color:'#666',marginBottom:'30px'}}>
                                {lang === 'AR' ? 'الرابط منتهي الصلاحية أو غير صالح' : 
                                 'Le lien a expiré ou est invalide'}
                            </p>
                            <button onClick={() => navigate('/login')} className="login-submit">
                                {t.backToLogin} <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Valid token — show form
    return (
        <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
            <div className="login-container">
                <div className="login-left">
                    <div className="login-left-overlay"></div>
                    <div className="login-branding">
                        <div className="login-logo">AMUDUX</div>
                        <h1 className="login-tagline">
                            {lang === 'AR' ? 'كلمة مرور جديدة' : 
                             lang === 'FR' ? 'Nouveau mot de passe' : 
                             'New Password'}
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
                                <label><Lock size={16} className="label-icon" />{t.password}</label>
                                <div className="password-input">
                                    <input 
                                        type={showPassword ? 'text' : 'password'} 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder="••••••••" 
                                        required 
                                    />
                                    <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label><Lock size={16} className="label-icon" />{t.confirmPassword}</label>
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={passwordConfirmation} 
                                    onChange={(e) => setPasswordConfirmation(e.target.value)} 
                                    placeholder="••••••••" 
                                    required 
                                />
                            </div>

                            <button type="submit" className="login-submit" disabled={loading}>
                                {loading ? <span className="spinner"></span> : (
                                    <>{t.reset} <ArrowRight size={18} /></>
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

export default ResetPassword;
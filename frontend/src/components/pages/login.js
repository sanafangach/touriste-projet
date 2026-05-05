import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Globe, Hotel, Compass } from 'lucide-react';
import { useLanguage } from '../accueil/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import '../css/Login.css';

function Login() {
    const { lang, isRTL } = useLanguage();
    const { login } = useAuth();
    const navigate = useNavigate();
    
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError(lt[lang].allFieldsRequired);
            return false;
        }
        
        if (isRegister) {
            if (!formData.name) {
                setError(lt[lang].allFieldsRequired);
                return false;
            }
            if (formData.password !== formData.password_confirmation) {
                setError(lt[lang].passwordsDontMatch);
                return false;
            }
            if (formData.password.length < 6) {
                setError(lt[lang].passwordTooShort);
                return false;
            }
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoading(true);
        setError('');
        setSuccess('');
        
        try {
            if (isRegister) {
                const response = await api.post('/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.password_confirmation
                });
                
                setSuccess(lt[lang].registerSuccess);
                setIsRegister(false);
                setFormData({
                    ...formData,
                    name: '',
                    password: '',
                    password_confirmation: ''
                });
                
            } else {
                const response = await api.post('/login', {
                    email: formData.email,
                    password: formData.password
                });
                
                const { user, token } = response.data;
                login(user, token);
                
                if (user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }
            
        } catch (err) {
            if (err.response?.status === 422) {
                const errors = err.response.data.errors;
                const firstError = Object.values(errors)[0]?.[0];
                setError(firstError || lt[lang].verifyInfo);
            } else if (err.response?.status === 401) {
                setError(err.response.data.message || lt[lang].invalidCredentials);
            } else if (err.code === 'ERR_NETWORK') {
                setError(lt[lang].networkError);
            } else {
                setError(err.response?.data?.message || err.message || lt[lang].errorOccurred);
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setError('');
        setSuccess('');
    };

    // Traductions
    const lt = {
        FR: {
            welcomeBack: 'Bon retour !',
            createAccount: 'Créer un compte',
            email: 'Email',
            password: 'Mot de passe',
            name: 'Nom complet',
            confirmPassword: 'Confirmer le mot de passe',
            login: 'Se connecter',
            register: 'S\'inscrire',
            noAccount: 'Pas encore de compte ?',
            haveAccount: 'Déjà un compte ?',
            signUp: 'S\'inscrire',
            signIn: 'Se connecter',
            allFieldsRequired: 'Tous les champs sont requis',
            passwordsDontMatch: 'Les mots de passe ne correspondent pas',
            passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
            errorOccurred: 'Une erreur est survenue',
            verifyInfo: 'Veuillez vérifier vos informations',
            invalidCredentials: 'Email ou mot de passe incorrect',
            networkError: 'Erreur réseau. Vérifiez que le backend est démarré',
            registerSuccess: 'Inscription réussie ! Connectez-vous maintenant.',
            orContinueWith: 'Ou continuer avec',
            google: 'Google',
            facebook: 'Facebook',
            subtitleLogin: 'Explorez le Maroc avec nous',
            subtitleRegister: 'Rejoignez l\'aventure marocaine',
            discoverMorocco: 'Découvrez le Maroc',
            bestHotels: 'Meilleurs hôtels',
            excitingActivities: 'Activités passionnantes'
        },
        EN: {
            welcomeBack: 'Welcome Back!',
            createAccount: 'Create Account',
            email: 'Email',
            password: 'Password',
            name: 'Full Name',
            confirmPassword: 'Confirm Password',
            login: 'Sign In',
            register: 'Sign Up',
            noAccount: 'Don\'t have an account?',
            haveAccount: 'Already have an account?',
            signUp: 'Sign Up',
            signIn: 'Sign In',
            allFieldsRequired: 'All fields are required',
            passwordsDontMatch: 'Passwords do not match',
            passwordTooShort: 'Password must be at least 6 characters',
            errorOccurred: 'An error occurred',
            verifyInfo: 'Please check your information',
            invalidCredentials: 'Invalid email or password',
            networkError: 'Network error. Check if backend is running',
            registerSuccess: 'Registration successful! Please log in.',
            orContinueWith: 'Or continue with',
            google: 'Google',
            facebook: 'Facebook',
            subtitleLogin: 'Explore Morocco with us',
            subtitleRegister: 'Join the Moroccan adventure',
            discoverMorocco: 'Discover Morocco',
            bestHotels: 'Best hotels',
            excitingActivities: 'Exciting activities'
        },
        AR: {
            welcomeBack: 'مرحباً بعودتك!',
            createAccount: 'إنشاء حساب',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            name: 'الاسم الكامل',
            confirmPassword: 'تأكيد كلمة المرور',
            login: 'تسجيل الدخول',
            register: 'إنشاء حساب',
            noAccount: 'ليس لديك حساب؟',
            haveAccount: 'لديك حساب بالفعل؟',
            signUp: 'سجل الآن',
            signIn: 'سجل الدخول',
            allFieldsRequired: 'جميع الحقول مطلوبة',
            passwordsDontMatch: 'كلمات المرور غير متطابقة',
            passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
            errorOccurred: 'حدث خطأ',
            verifyInfo: 'يرجى التحقق من المعلومات',
            invalidCredentials: 'البريد أو كلمة المرور غير صحيحة',
            networkError: 'خطأ في الشبكة. تأكد من تشغيل الخادم',
            registerSuccess: 'تم التسجيل بنجاح! سجل الدخول الآن.',
            orContinueWith: 'أو تابع باستخدام',
            google: 'جوجل',
            facebook: 'فيسبوك',
            subtitleLogin: 'اكتشف المغرب معنا',
            subtitleRegister: 'انضم إلى مغامرة مغربية',
            discoverMorocco: 'اكتشف المغرب',
            bestHotels: 'أفضل الفنادق',
            excitingActivities: 'أنشطة مثيرة'
        }
    };

    const currentLang = lt[lang];

    return (
        <div className={`login-page ${isRTL ? 'rtl' : ''}`}>
            <div className="login-container">
                {/* LEFT SIDE - Matching Home Hero Style */}
                <div className="login-left">
                    <div className="login-left-overlay"></div>
                    
                    <div className="login-branding">
                        <div className="login-logo">AMUDUX</div>
                        <h1 className="login-tagline">
                            {lang === 'AR' ? 'اكتشف سحر المغرب' : 
                             lang === 'FR' ? 'Découvrez la magie du Maroc' : 
                             'Discover the magic of Morocco'}
                        </h1>
                        <p className="login-description">
                            {lang === 'AR' ? 'رحلة لا تُنسى عبر التقاليد والثقافة والمناظر الطبيعية الخلابة' :
                             lang === 'FR' ? 'Un voyage inoubliable à travers traditions, culture et paysages époustouflants' :
                             'An unforgettable journey through traditions, culture and breathtaking landscapes'}
                        </p>
                    </div>

                    <div className="login-features">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Globe size={20} />
                            </div>
                            <div className="feature-text">
                                <strong>{currentLang.discoverMorocco}</strong>
                                <span>{lang === 'AR' ? 'وجهات فريدة' : lang === 'FR' ? 'Destinations uniques' : 'Unique destinations'}</span>
                            </div>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Hotel size={20} />
                            </div>
                            <div className="feature-text">
                                <strong>{currentLang.bestHotels}</strong>
                                <span>{lang === 'AR' ? 'إقامة فاخرة' : lang === 'FR' ? 'Hébergement de luxe' : 'Luxury accommodation'}</span>
                            </div>
                        </div>
                        
                        <div className="feature-item">
                            <div className="feature-icon">
                                <Compass size={20} />
                            </div>
                            <div className="feature-text">
                                <strong>{currentLang.excitingActivities}</strong>
                                <span>{lang === 'AR' ? 'تجارب لا تُنسى' : lang === 'FR' ? 'Expériences mémorables' : 'Memorable experiences'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative circles like home */}
                    <div className="login-decorative-circle circle-1"></div>
                    <div className="login-decorative-circle circle-2"></div>
                    <div className="login-decorative-circle circle-3"></div>
                </div>

                {/* RIGHT SIDE - Form */}
                <div className="login-right">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h2>{isRegister ? currentLang.createAccount : currentLang.welcomeBack}</h2>
                            <p className="login-subtitle">
                                {isRegister ? currentLang.subtitleRegister : currentLang.subtitleLogin}
                            </p>
                        </div>
                        
                        {error && <div className="login-error">{error}</div>}
                        {success && <div className="login-success">{success}</div>}
                        
                        <form onSubmit={handleSubmit} className="login-form">
                            {isRegister && (
                                <div className="form-group">
                                    <label>
                                        <User size={16} className="label-icon" />
                                        {currentLang.name}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={currentLang.name}
                                        required
                                    />
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label>
                                    <Mail size={16} className="label-icon" />
                                    {currentLang.email}
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>
                                    <Lock size={16} className="label-icon" />
                                    {currentLang.password}
                                </label>
                                <div className="password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            
                            {isRegister && (
                                <div className="form-group">
                                    <label>
                                        <Lock size={16} className="label-icon" />
                                        {currentLang.confirmPassword}
                                    </label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            )}
                            
                            <button
                                type="submit"
                                className="login-submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    <>
                                        {isRegister ? currentLang.register : currentLang.login}
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="login-divider">
                            <span>{currentLang.orContinueWith}</span>
                        </div>

                        <div className="social-login">
                            <button className="social-btn google">
                                <svg viewBox="0 0 24 24" width="18" height="18">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                {currentLang.google}
                            </button>
                            <button className="social-btn facebook">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                {currentLang.facebook}
                            </button>
                        </div>

                        <p className="login-toggle">
                            {isRegister ? currentLang.haveAccount : currentLang.noAccount}{' '}
                            <button onClick={toggleMode} className="toggle-btn">
                                {isRegister ? currentLang.signIn : currentLang.signUp}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
// src/services/googleAuth.js

export const loginWithGoogle = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = window.location.origin + '/auth/google/callback';

    if (!clientId) {
        throw new Error('Google Client ID is not configured.');
    }

    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        prompt: 'consent select_account',
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    // Redirect direct - بلا popup
    window.location.href = googleAuthUrl;
};

export const config = {
    darna: {
        baseURL: import.meta.env.VITE_DARNA_API_URL || 'http://localhost:4000',
    },
    tirelire: {
        baseURL: import.meta.env.VITE_TIRELIRE_API_URL || 'http://localhost:5000',
    },
    sso: {
        baseURL: import.meta.env.VITE_SSO_API_URL || '/api/sso',
        clientId: import.meta.env.VITE_SSO_CLIENT_ID || 'tireliredarna-client',
        redirectUri: import.meta.env.VITE_SSO_REDIRECT_URI || 'http://localhost:5173/auth/callback',
        authEndpoint: import.meta.env.VITE_SSO_AUTH_ENDPOINT || 'http://localhost:3001/api/v1/auth/authorize',
        tokenEndpoint: import.meta.env.VITE_SSO_TOKEN_ENDPOINT || 'http://localhost:3001/api/v1/auth/token',
        logoutEndpoint: import.meta.env.VITE_SSO_LOGOUT_ENDPOINT || 'http://localhost:3001/api/v1/auth/logout',
    },
    google: {
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    },
    maps: {
        mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN || '',
    },
    stripe: {
        publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
    },
    storage: {
        minioEndpoint: import.meta.env.VITE_MINIO_ENDPOINT || 'http://localhost:9000',
        minioBucket: import.meta.env.VITE_MINIO_BUCKET || 'uploads',
    },
    socket: {
        url: import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000',
    },
    sentry: {
        dsn: import.meta.env.VITE_SENTRY_DSN || '',
    },
    env: import.meta.env.VITE_APP_ENV || 'development',
}

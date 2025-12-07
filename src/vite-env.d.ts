/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DARNA_API_URL: string
    readonly VITE_TIRELIRE_API_URL: string
    readonly VITE_SSO_API_URL: string
    readonly VITE_SSO_CLIENT_ID: string
    readonly VITE_SSO_REDIRECT_URI: string
    readonly VITE_SSO_AUTH_ENDPOINT: string
    readonly VITE_SSO_TOKEN_ENDPOINT: string
    readonly VITE_SSO_LOGOUT_ENDPOINT: string
    readonly VITE_GOOGLE_CLIENT_ID: string
    readonly VITE_MAPBOX_TOKEN: string
    readonly VITE_STRIPE_PUBLISHABLE_KEY: string
    readonly VITE_MINIO_ENDPOINT: string
    readonly VITE_MINIO_BUCKET: string
    readonly VITE_SOCKET_URL: string
    readonly VITE_SENTRY_DSN: string
    readonly VITE_APP_ENV: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

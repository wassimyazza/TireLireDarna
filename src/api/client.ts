import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { config } from '../config/env'

let refreshPromise: Promise<string> | null = null

export interface TokenStorage {
    getAccessToken: () => string | null
    setAccessToken: (token: string) => void
    getRefreshToken: () => string | null
    setRefreshToken: (token: string) => void
    clearTokens: () => void
}

/**
 * Token storage using localStorage for persistence across page refreshes
 */
const tokenStorage: TokenStorage = {
    getAccessToken: () => localStorage.getItem('access_token'),
    setAccessToken: (token: string) => localStorage.setItem('access_token', token),
    getRefreshToken: () => localStorage.getItem('refresh_token'),
    setRefreshToken: (token: string) => localStorage.setItem('refresh_token', token),
    clearTokens: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    },
}

/**
 * Alternative: localStorage-based token storage
 * WARNING: Vulnerable to XSS attacks. Use only in development or with proper security measures
 */
export const localStorageTokenStorage: TokenStorage = {
    getAccessToken: () => localStorage.getItem('access_token'),
    setAccessToken: (token: string) => localStorage.setItem('access_token', token),
    getRefreshToken: () => localStorage.getItem('refresh_token'),
    setRefreshToken: (token: string) => localStorage.setItem('refresh_token', token),
    clearTokens: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    },
}

/**
 * Create an axios instance with auth interceptors
 */
export function createAuthenticatedClient(
    baseURL: string,
    storage: TokenStorage = tokenStorage,
    onUnauthorized?: () => void
): AxiosInstance {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    // Request interceptor: inject access token
    client.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const token = storage.getAccessToken()
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        (error) => Promise.reject(error)
    )

    // Response interceptor: handle 401 and refresh token
    client.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

            // If 401 and we haven't retried yet
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true

                try {
                    const newAccessToken = await handleTokenRefresh(storage)

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    }
                    return client(originalRequest)
                } catch (refreshError) {
                    // Refresh failed, clear tokens and redirect to login
                    storage.clearTokens()
                    if (onUnauthorized) {
                        onUnauthorized()
                    }
                    return Promise.reject(refreshError)
                }
            }

            return Promise.reject(error)
        }
    )

    return client
}

/**
 * Handle token refresh with request deduplication
 */
async function handleTokenRefresh(storage: TokenStorage): Promise<string> {
    // If already refreshing, return existing promise
    if (refreshPromise) {
        return refreshPromise
    }

    refreshPromise = (async () => {
        try {
            const refreshToken = storage.getRefreshToken()
            if (!refreshToken) {
                throw new Error('No refresh token available')
            }

            // Call SSO token endpoint for refresh
            const response = await axios.post(
                config.sso.tokenEndpoint,
                new URLSearchParams({
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: config.sso.clientId,
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            )

            const { access_token, refresh_token: newRefreshToken } = response.data

            storage.setAccessToken(access_token)
            if (newRefreshToken) {
                storage.setRefreshToken(newRefreshToken)
            }

            return access_token
        } finally {
            refreshPromise = null
        }
    })()

    return refreshPromise
}

// Export configured clients
export const apiDarna = createAuthenticatedClient(config.darna.baseURL, tokenStorage)
export const apiTirelire = createAuthenticatedClient(config.tirelire.baseURL, tokenStorage)
export const apiSSO = createAuthenticatedClient(config.sso.baseURL, tokenStorage)

// Export token storage for use in auth context
export { tokenStorage }

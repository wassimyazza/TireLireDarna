import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAppDispatch } from '../store/hooks'
import { setUser, clearUser, setLoading } from '../store/slices/authSlice'
import { tokenStorage } from '../api/client'
import { config } from '../config/env'
import {
    generatePKCE,
    retrievePKCEState,
    buildAuthorizationUrl,
    exchangeCodeForTokens,
    refreshAccessToken,
} from '../utils/pkce'
import { apiDarna, apiSSO } from '../api/client'
import type { User } from '../store/slices/authSlice'

// Direct axios instance for auth server (bypasses Vite proxy issues)
const authAPI = axios.create({
    baseURL: 'http://localhost:4444/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
    },
})

interface AuthContextType {
    user: User | null
    login: () => Promise<void>
    loginWithEmail: (email: string, password: string) => Promise<void>
    registerWithEmail: (fullName: string, email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    handleCallback: (code: string, state: string) => Promise<void>
    isAuthenticated: boolean
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoadingState] = useState(true)
    const [user, setUserState] = useState<User | null>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Initialize auth state on mount
    useEffect(() => {
        const initAuth = async () => {
            const token = tokenStorage.getAccessToken()

            if (token) {
                try {
                    // Try to decode token to get user info
                    const tokenParts = token.split('.')
                    if (tokenParts.length === 3) {
                        const payload = JSON.parse(atob(tokenParts[1]))

                        // Set basic user info from token
                        const userData = {
                            id: payload.userId || payload.sub,
                            email: payload.email,
                            name: payload.name || payload.email?.split('@')[0] || 'User',
                            role: payload.role || 'user'
                        }

                        dispatch(setUser(userData))
                        setUserState(userData)
                        setIsAuthenticated(true)

                        // Optionally try to fetch full profile (don't fail if it doesn't exist)
                        try {
                            const response = await apiDarna.get('/auth/profile')
                            const fullUserData = response.data.data || response.data
                            dispatch(setUser(fullUserData))
                            setUserState(fullUserData)
                        } catch (profileError) {
                            // Profile endpoint doesn't exist, but that's okay
                            // We already have user info from token
                            console.log('Profile endpoint not available, using token data')
                        }
                    }
                } catch (error) {
                    // Token is completely invalid, clear it
                    console.error('Invalid token:', error)
                    tokenStorage.clearTokens()
                    dispatch(clearUser())
                }
            }

            setIsLoadingState(false)
            dispatch(setLoading(false))
        }

        initAuth()
    }, [dispatch])

    const login = useCallback(async () => {
        try {
            const pkce = await generatePKCE()

            const authUrl = buildAuthorizationUrl(
                config.sso.authEndpoint,
                config.sso.clientId,
                config.sso.redirectUri,
                pkce.codeChallenge,
                pkce.state
            )

            // Redirect to SSO
            window.location.href = authUrl
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }, [])

    const loginWithEmail = useCallback(async (email: string, password: string) => {
        try {
            setIsLoadingState(true)
            dispatch(setLoading(true))

            // Call auth server login endpoint directly
            const response = await authAPI.post('/login', { email, password })
            const { token, user: userData } = response.data.data || response.data

            // Store token
            tokenStorage.setAccessToken(token)

            // Update state
            dispatch(setUser(userData))
            setUserState(userData)
            setIsAuthenticated(true)

            // Redirect to dashboard
            navigate('/dashboard')
        } catch (error: any) {
            console.error('Login failed:', error)
            const message = error.response?.data?.error || 'Login failed'
            throw new Error(message)
        } finally {
            setIsLoadingState(false)
            dispatch(setLoading(false))
        }
    }, [dispatch, navigate])

    const registerWithEmail = useCallback(async (fullName: string, email: string, password: string) => {
        try {
            setIsLoadingState(true)
            dispatch(setLoading(true))

            // Split full name into first and last name
            const nameParts = fullName.trim().split(' ')
            const firstName = nameParts[0] || ''
            const lastName = nameParts.slice(1).join(' ') || ''

            // Call auth server register endpoint directly
            const response = await authAPI.post('/register', {
                email,
                password,
                confirmPassword: password,
                firstName,
                lastName
            })

            const { token, user: userData } = response.data.data || response.data

            // Store token
            tokenStorage.setAccessToken(token)

            // Update state
            dispatch(setUser(userData))
            setUserState(userData)
            setIsAuthenticated(true)

            // Redirect to dashboard
            navigate('/dashboard')
        } catch (error: any) {
            console.error('Registration failed:', error)
            const message = error.response?.data?.error || 'Registration failed'
            throw new Error(message)
        } finally {
            setIsLoadingState(false)
            dispatch(setLoading(false))
        }
    }, [dispatch, navigate])

    const handleCallback = useCallback(async (code: string, state: string) => {
        try {
            setIsLoadingState(true)
            dispatch(setLoading(true))

            const pkceState = retrievePKCEState()

            if (!pkceState || pkceState.state !== state) {
                throw new Error('Invalid OAuth state')
            }

            // Exchange code for tokens
            const tokens = await exchangeCodeForTokens(
                config.sso.tokenEndpoint,
                code,
                pkceState.codeVerifier,
                config.sso.clientId,
                config.sso.redirectUri
            )

            tokenStorage.setAccessToken(tokens.access_token)
            if (tokens.refresh_token) {
                tokenStorage.setRefreshToken(tokens.refresh_token)
            }

            // Fetch user profile
            const response = await apiDarna.get('/auth/profile')
            const userData = response.data.data || response.data

            dispatch(setUser(userData))
            setUserState(userData)
            setIsAuthenticated(true)

            navigate('/dashboard')
        } catch (error) {
            console.error('OAuth callback failed:', error)
            tokenStorage.clearTokens()
            dispatch(clearUser())
            navigate('/login')
        } finally {
            setIsLoadingState(false)
            dispatch(setLoading(false))
        }
    }, [dispatch, navigate])

    const logout = useCallback(async () => {
        try {
            // Optionally call SSO logout endpoint
            const token = tokenStorage.getAccessToken()
            if (token) {
                await fetch(config.sso.logoutEndpoint, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            }
        } catch (error) {
            console.error('Logout API call failed:', error)
        } finally {
            tokenStorage.clearTokens()
            dispatch(clearUser())
            setUserState(null)
            setIsAuthenticated(false)
            navigate('/login')
        }
    }, [dispatch, navigate])

    const value: AuthContextType = {
        user,
        login,
        loginWithEmail,
        registerWithEmail,
        logout,
        handleCallback,
        isAuthenticated,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

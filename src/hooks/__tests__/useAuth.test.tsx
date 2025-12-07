import { renderHook, waitFor } from '@testing-library/react'
import { useAuth } from '@/contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/store'
import React from 'react'

describe('useAuth hook', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>
    )

    it('should initialize with unauthenticated state', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })

        expect(result.current.isAuthenticated).toBe(false)
        expect(result.current.user).toBeNull()
    })

    it('should expose login and logout functions', () => {
        const { result } = renderHook(() => useAuth(), { wrapper })

        expect(typeof result.current.login).toBe('function')
        expect(typeof result.current.logout).toBe('function')
    })
})

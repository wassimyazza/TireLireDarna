import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface RequireAuthProps {
    children: React.ReactNode
    roles?: Array<'visiteur' | 'particulier' | 'entreprise' | 'admin'>
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children, roles }) => {
    const { isAuthenticated, isLoading, user } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Check role-based access
    if (roles && roles.length > 0 && user) {
        if (!roles.includes(user.role)) {
            return <Navigate to="/unauthorized" replace />
        }
    }

    return <>{children}</>
}

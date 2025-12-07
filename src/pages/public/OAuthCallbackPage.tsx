import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const OAuthCallbackPage: React.FC = () => {
    const [searchParams] = useSearchParams()
    const { handleCallback } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        const error = searchParams.get('error')

        if (error) {
            navigate('/login')
            return
        }

        if (code && state) {
            handleCallback(code, state).catch(() => {
                navigate('/login')
            })
        } else {
            navigate('/login')
        }
    }, [searchParams, handleCallback, navigate])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="spinner mx-auto mb-4"></div>
                <p className="text-gray-600">Completing login...</p>
            </div>
        </div>
    )
}

export default OAuthCallbackPage

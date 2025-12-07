import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const ProfilePage: React.FC = () => {
    const { user } = useAuth()

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Profile</h1>

            <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <div>
                    <label className="block text-gray-600 mb-2">Name</label>
                    <p className="text-lg">{user?.name}</p>
                </div>
                <div>
                    <label className="block text-gray-600 mb-2">Email</label>
                    <p className="text-lg">{user?.email}</p>
                </div>
                <div>
                    <label className="block text-gray-600 mb-2">Role</label>
                    <p className="text-lg capitalize">{user?.role}</p>
                </div>
                {user?.kycStatus && (
                    <div>
                        <label className="block text-gray-600 mb-2">KYC Status</label>
                        <p className="text-lg capitalize">{user.kycStatus}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfilePage

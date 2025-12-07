import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useProperties } from '../../hooks/useProperties'

const DashboardPage: React.FC = () => {
    const { user } = useAuth()
    const { data: myProperties } = useProperties({ owner: user?._id })

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">My Properties</h3>
                    <p className="text-3xl font-bold">{myProperties?.length || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Messages</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Favorites</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <p className="text-gray-600">No recent activity</p>
            </div>
        </div>
    )
}

export default DashboardPage

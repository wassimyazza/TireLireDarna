import React from 'react'

const AdminDashboardPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl  font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Total Users</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Total Properties</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Pending KYC</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-600 mb-2">Active Groups</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardPage

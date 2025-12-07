import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/Header'
import Sidebar from '../common/Sidebar'

const DashboardLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout

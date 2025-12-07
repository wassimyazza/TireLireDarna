import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const Sidebar: React.FC = () => {
    const location = useLocation()
    const { user } = useAuth()

    const isActive = (path: string) => location.pathname.startsWith(path)

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/dashboard/my-properties', label: 'My Properties', icon: '🏠' },
        { path: '/dashboard/favorites', label: 'Favorites', icon: '❤️' },
        { path: '/dashboard/messages', label: 'Messages', icon: '💬' },
        { path: '/tirelire/my-groups', label: 'My Groups', icon: '👥' },
        { path: '/dashboard/profile', label: 'Profile', icon: '👤' },
    ]

    const adminLinks = [
        { path: '/admin', label: 'Admin Dashboard', icon: '⚙️' },
        { path: '/admin/users', label: 'Users', icon: '👥' },
        { path: '/admin/properties', label: 'Properties', icon: '🏘️' },
        { path: '/admin/kyc', label: 'KYC Review', icon: '✔️' },
    ]

    return (
        <aside className="w-64 bg-white shadow-md">
            <nav className="p-4 space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(link.path)
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                    </Link>
                ))}

                {user?.role === 'admin' && (
                    <>
                        <div className="border-t my-4 pt-4">
                            <p className="px-4 text-xs text-gray-500 uppercase mb-2">Admin</p>
                            {adminLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(link.path)
                                        ? 'bg-red-50 text-red-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </nav>
        </aside>
    )
}

export default Sidebar

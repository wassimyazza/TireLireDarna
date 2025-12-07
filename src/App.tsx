import { Routes, Route, Navigate } from 'react-router-dom'
import { RequireAuth } from './components/auth/RequireAuth'

// Layouts
import MainLayout from './components/layouts/MainLayout'
import DashboardLayout from './components/layouts/DashboardLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import OAuthCallbackPage from './pages/public/OAuthCallbackPage'
import PropertiesPage from './pages/public/PropertiesPage'
import PropertyDetailPage from './pages/public/PropertyDetailPage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import NotFoundPage from './pages/public/NotFoundPage'

// User Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage'
import MyPropertiesPage from './pages/dashboard/MyPropertiesPage'
import CreatePropertyPage from './pages/dashboard/CreatePropertyPage'
import EditPropertyPage from './pages/dashboard/EditPropertyPage'
import FavoritesPage from './pages/dashboard/FavoritesPage'
import MessagesPage from './pages/dashboard/MessagesPage'
import ProfilePage from './pages/dashboard/ProfilePage'

// Tirelire Pages
import GroupsPage from './pages/tirelire/GroupsPage'
import GroupDetailPage from './pages/tirelire/GroupDetailPage'
import CreateGroupPage from './pages/tirelire/CreateGroupPage'
import MyGroupsPage from './pages/tirelire/MyGroupsPage'
import KYCPage from './pages/tirelire/KYCPage'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage'
import AdminKYCPage from './pages/admin/AdminKYCPage'

function App() {
    return (
        <Routes>
            {/* Public routes with main layout */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/callback" element={<OAuthCallbackPage />} />

            {/* Protected dashboard routes */}
            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <DashboardLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="my-properties" element={<MyPropertiesPage />} />
                <Route path="properties/create" element={<CreatePropertyPage />} />
                <Route path="properties/edit/:id" element={<EditPropertyPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="messages" element={<MessagesPage />} />
                <Route path="profile" element={<ProfilePage />} />
            </Route>

            {/* Tirelire routes */}
            <Route
                path="/tirelire"
                element={
                    <RequireAuth>
                        <DashboardLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<Navigate to="/tirelire/groups" replace />} />
                <Route path="groups" element={<GroupsPage />} />
                <Route path="groups/:id" element={<GroupDetailPage />} />
                <Route path="groups/create" element={<CreateGroupPage />} />
                <Route path="my-groups" element={<MyGroupsPage />} />
                <Route path="kyc" element={<KYCPage />} />
            </Route>

            {/* Admin routes */}
            <Route
                path="/admin"
                element={
                    <RequireAuth roles={['admin']}>
                        <DashboardLayout />
                    </RequireAuth>
                }
            >
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="properties" element={<AdminPropertiesPage />} />
                <Route path="kyc" element={<AdminKYCPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default App

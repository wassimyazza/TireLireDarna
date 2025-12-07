import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useProperties } from '../../hooks/useProperties'
import { useDeleteProperty } from '../../hooks/useProperties'
import { toast } from 'react-toastify'

const MyPropertiesPage: React.FC = () => {
    const { user } = useAuth()
    const { data: properties, isLoading, refetch } = useProperties({ owner: user?._id })
    const deleteProperty = useDeleteProperty()

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this property?')) {
            try {
                await deleteProperty.mutateAsync(id)
                toast.success('Property deleted')
                refetch()
            } catch (error) {
                toast.error('Failed to delete property')
            }
        }
    }

    if (isLoading) {
        return <div className="flex justify-center"><div className="spinner"></div></div>
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Properties</h1>
                <Link
                    to="/dashboard/properties/create"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Add Property
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties?.map((property: any) => (
                    <div key={property._id} className="border rounded-lg overflow-hidden">
                        <img
                            src={property.images[0] ? `http://localhost:4000${property.images[0]}` : '/placeholder.jpg'}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                            <p className="text-blue-600 font-bold mb-4">${property.price.toLocaleString()}</p>
                            <div className="flex gap-2">
                                <Link
                                    to={`/dashboard/properties/edit/${property._id}`}
                                    className="flex-1 bg-gray-200 px-3 py-2 rounded text-center hover:bg-gray-300"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(property._id)}
                                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyPropertiesPage

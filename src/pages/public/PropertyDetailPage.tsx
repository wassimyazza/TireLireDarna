import React from 'react'
import { useParams } from 'react-router-dom'
import { useProperty } from '../../hooks/useProperties'

const PropertyDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data: property, isLoading } = useProperty(id!)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="spinner"></div>
            </div>
        )
    }

    if (!property) {
        return <div className="container mx-auto px-4 py-8">Property not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Images */}
                <div>
                    <img
                        src={property.images[0] || '/placeholder.jpg'}
                        alt={property.title}
                        className="w-full h-96 object-cover rounded-lg"
                    />
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
                    <p className="text-2xl text-blue-600 font-bold mb-4">
                        ${property.price.toLocaleString()}
                    </p>
                    <p className="text-gray-700 mb-6">{property.description}</p>

                    <div className="space-y-2 mb-6">
                        <p><strong>Type:</strong> {property.type}</p>
                        <p><strong>Location:</strong> {property.location.address}, {property.location.city}</p>
                        {property.bedrooms && <p><strong>Bedrooms:</strong> {property.bedrooms}</p>}
                        {property.bathrooms && <p><strong>Bathrooms:</strong> {property.bathrooms}</p>}
                        {property.surface && <p><strong>Surface:</strong> {property.surface} m²</p>}
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                        Contact Owner
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PropertyDetailPage

import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProperties } from '../../hooks/useProperties'

const PropertiesPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filters, setFilters] = useState({
        type: searchParams.get('type') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        city: searchParams.get('city') || '',
        search: searchParams.get('search') || '',
    })

    const { data: properties, isLoading } = useProperties(filters)

    const handleFilterChange = (key: string, value: string) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)

        const params = new URLSearchParams()
        Object.entries(newFilters).forEach(([k, v]) => {
            if (v) params.set(k, v)
        })
        setSearchParams(params)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Browse Properties</h1>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="border rounded px-3 py-2"
                />
                <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="border rounded px-3 py-2"
                >
                    <option value="">All Types</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="land">Land</option>
                </select>
                <input
                    type="number"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="border rounded px-3 py-2"
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="border rounded px-3 py-2"
                />
            </div>

            {/* Results */}
            {isLoading ? (
                <div className="flex justify-center">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties?.map((property: any) => (
                        <a
                            key={property._id}
                            href={`/properties/${property._id}`}
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={property.images[0] ? `http://localhost:4000${property.images[0]}` : '/placeholder.jpg'}
                                alt={property.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                                <p className="text-gray-600 mb-2">{property.location.city}</p>
                                <p className="text-blue-600 font-bold">${property.price.toLocaleString()}</p>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}

export default PropertiesPage

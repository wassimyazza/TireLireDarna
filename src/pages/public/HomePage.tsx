import React from 'react'
import { Link } from 'react-router-dom'
import { useProperties } from '../../hooks/useProperties'

const HomePage: React.FC = () => {
    const { data: properties } = useProperties({ limit: 6, sortBy: 'priority' })

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6">Find Your Dream Property</h1>
                    <p className="text-xl mb-8">Browse thousands of properties and join savings groups</p>
                    <Link
                        to="/properties"
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                        Explore Properties
                    </Link>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {properties?.map((property: any) => (
                        <Link
                            key={property._id}
                            to={`/properties/${property._id}`}
                            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                            <img
                                src={property.images[0] || '/placeholder.jpg'}
                                alt={property.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                                <p className="text-gray-600 mb-2">{property.location.city}</p>
                                <p className="text-blue-600 font-bold">${property.price.toLocaleString()}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Tirelire Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join Savings Groups with Tirelire</h2>
                    <p className="text-lg text-gray-700 mb-8">
                        Save together, reach your goals faster
                    </p>
                    <Link
                        to="/tirelire/groups"
                        className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                        Explore Groups
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default HomePage

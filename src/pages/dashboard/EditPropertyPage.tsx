import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProperty, useUpdateProperty } from '../../hooks/useProperties'
import { toast } from 'react-toastify'

const EditPropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { data: property, isLoading } = useProperty(id!)
    const updateProperty = useUpdateProperty()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'apartment',
        price: '',
        address: '',
        city: '',
        bedrooms: '',
        bathrooms: '',
        surface: '',
    })

    // Populate form when property loads
    useEffect(() => {
        if (property) {
            setFormData({
                title: property.title || '',
                description: property.description || '',
                type: property.type || 'apartment',
                price: property.price?.toString() || '',
                address: property.location?.address || '',
                city: property.city || property.location?.city || '',
                bedrooms: property.bedrooms?.toString() || '',
                bathrooms: property.bathrooms?.toString() || '',
                surface: property.surface?.toString() || '',
            })
        }
    }, [property])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await updateProperty.mutateAsync({
                id: id!,
                ...formData,
                price: Number(formData.price),
                bedrooms: Number(formData.bedrooms) || undefined,
                bathrooms: Number(formData.bathrooms) || undefined,
                surface: Number(formData.surface) || undefined,
                location: {
                    address: formData.address,
                    city: formData.city,
                },
            })

            toast.success('Property updated successfully!')
            navigate('/dashboard/my-properties')
        } catch (error) {
            toast.error('Failed to update property')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    if (isLoading) {
        return <div className="flex justify-center"><div className="spinner"></div></div>
    }

    if (!property) {
        return <div className="text-center">Property not found</div>
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Edit Property</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-4 py-2 h-32"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2"
                        >
                            <option value="apartment">Apartment</option>
                            <option value="villa">Villa</option>
                            <option value="house">House</option>
                            <option value="land">Land</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Bedrooms</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Bathrooms</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Surface (m²)</label>
                        <input
                            type="number"
                            name="surface"
                            value={formData.surface}
                            onChange={handleChange}
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Image editing is not yet supported. Existing images will be preserved.
                    </p>
                    {property.images && property.images.length > 0 && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">Current images: {property.images.length}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={updateProperty.isPending}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {updateProperty.isPending ? 'Updating...' : 'Update Property'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/my-properties')}
                        className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPropertyPage

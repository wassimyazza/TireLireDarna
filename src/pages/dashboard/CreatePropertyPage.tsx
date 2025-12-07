import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProperty } from '../../hooks/useProperties'
import { toast } from 'react-toastify'

const CreatePropertyPage: React.FC = () => {
    const navigate = useNavigate()
    const createProperty = useCreateProperty()
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
    const [images, setImages] = useState<File[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            // Create FormData for multipart/form-data submission
            const formDataToSend = new FormData()

            // Add all text fields
            formDataToSend.append('title', formData.title)
            formDataToSend.append('description', formData.description)
            formDataToSend.append('type', formData.type)
            formDataToSend.append('price', formData.price)
            formDataToSend.append('city', formData.city)
            if (formData.bedrooms) formDataToSend.append('bedrooms', formData.bedrooms)
            if (formData.bathrooms) formDataToSend.append('bathrooms', formData.bathrooms)
            if (formData.surface) formDataToSend.append('surface', formData.surface)

            // Add location as JSON string
            formDataToSend.append('location', JSON.stringify({
                address: formData.address,
                city: formData.city
            }))

            // Add image files
            images.forEach((image) => {
                formDataToSend.append('images', image)
            })

            await createProperty.mutateAsync(formDataToSend)

            toast.success(`Property created with ${images.length} image(s)!`)
            navigate('/dashboard/my-properties')
        } catch (error) {
            toast.error('Failed to create property')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Create Property</h1>

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

                <div>
                    <label className="block mb-2 font-semibold">Property Images (up to 5)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            if (e.target.files) {
                                const fileArray = Array.from(e.target.files).slice(0, 5)
                                setImages(fileArray)
                            }
                        }}
                        className="w-full border rounded px-4 py-2"
                    />
                    {images.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                            ✅ {images.length} image(s) selected
                        </p>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={createProperty.isPending}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {createProperty.isPending ? 'Creating...' : 'Create Property'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/my-properties')}
                        className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form >
        </div >
    )
}

export default CreatePropertyPage

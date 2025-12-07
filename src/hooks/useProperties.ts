import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiDarna } from '../api/client'

export interface Property {
    _id: string
    title: string
    description: string
    type: 'villa' | 'apartment' | 'house' | 'land'
    price: number
    location: {
        address: string
        city: string
        coordinates?: [number, number]
    }
    images: string[]
    bedrooms?: number
    bathrooms?: number
    surface?: number
    owner: {
        _id: string
        name: string
        avatar?: string
    }
    isPriority?: boolean
    isPromoted?: boolean
    createdAt: string
    updatedAt: string
}

export interface PropertyFilters {
    type?: string
    minPrice?: number
    maxPrice?: number
    city?: string
    bedrooms?: number
    coordinates?: [number, number]
    radius?: number
    search?: string
    sortBy?: 'createdAt' | 'price' | 'priority'
    sortOrder?: 'asc' | 'desc'
    page?: number
    limit?: number
}

// Fetch properties with filters
export const useProperties = (filters: PropertyFilters = {}) => {
    return useQuery({
        queryKey: ['properties', filters],
        queryFn: async () => {
            const { data } = await apiDarna.get('/properties', { params: filters })
            return data?.data || []
        },
    })
}

// Fetch single property
export const useProperty = (id: string) => {
    return useQuery({
        queryKey: ['property', id],
        queryFn: async () => {
            const { data } = await apiDarna.get(`/properties/${id}`)
            return data.data
        },
        enabled: !!id,
    })
}

// Create property
export const useCreateProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (propertyData: FormData | Partial<Property>) => {
            const { data } = await apiDarna.post('/properties', propertyData, {
                headers: propertyData instanceof FormData ? {
                    'Content-Type': 'multipart/form-data'
                } : undefined
            })
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] })
        },
    })
}

// Update property
export const useUpdateProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string; updates: Partial<Property> }) => {
            const { data } = await apiDarna.put(`/properties/${id}`, updates)
            return data.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['properties'] })
            queryClient.invalidateQueries({ queryKey: ['property', variables.id] })
        },
    })
}

// Delete property
export const useDeleteProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            await apiDarna.delete(`/properties/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['properties'] })
        },
    })
}

// Search properties
export const useSearchProperties = (query: string, filters: PropertyFilters = {}) => {
    return useQuery({
        queryKey: ['properties', 'search', query, filters],
        queryFn: async () => {
            const { data } = await apiDarna.get('/search', {
                params: { q: query, ...filters },
            })
            return data.data
        },
        enabled: query.length > 2,
    })
}

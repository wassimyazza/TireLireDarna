import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiTirelire } from '../api/client'

export interface Group {
    _id: string
    name: string
    amount: number
    maxMembers: number
    round: 'week' | 'month' | '15days'
    members: Array<{
        userId: string
        name: string
        email: string
        trustScore: number
        turn: number
        hasPaid: boolean
    }>
    creator: string
    currentTurn: number
    nextDueDate?: string
    createdAt: string
}

export interface Contribution {
    _id: string
    groupId: string
    userId: string
    amount: number
    status: 'pending' | 'completed' | 'failed'
    createdAt: string
}

// Fetch groups
export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const { data } = await apiTirelire.get('/api/groups')
            return data?.data || []
        },
    })
}

// Fetch single group
export const useGroup = (id: string) => {
    return useQuery({
        queryKey: ['group', id],
        queryFn: async () => {
            const { data } = await apiTirelire.get(`/api/groups/${id}`)
            return data.data
        },
        enabled: !!id,
    })
}

// Create group
export const useCreateGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (groupData: Partial<Group>) => {
            const { data } = await apiTirelire.post('/api/groups', groupData)
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
        },
    })
}

// Invite members
export const useInviteMembers = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ groupId, emails }: { groupId: string; emails: string[] }) => {
            const { data } = await apiTirelire.post(`/api/groups/${groupId}/invite`, { emails })
            return data.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['group', variables.groupId] })
        },
    })
}

// Contribute to group
export const useContributeToGroup = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ groupId, amount }: { groupId: string; amount: number }) => {
            const { data } = await apiTirelire.post(`/api/contributions/group/${groupId}/contribute`, { amount })
            return data.data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['group', variables.groupId] })
            queryClient.invalidateQueries({ queryKey: ['contributions'] })
        },
    })
}

// Get contributions
export const useContributions = () => {
    return useQuery({
        queryKey: ['contributions'],
        queryFn: async () => {
            const { data } = await apiTirelire.get('/api/contributions/history')
            return data.data
        },
    })
}

// Get KYC status
export const useKYCStatus = () => {
    return useQuery({
        queryKey: ['kyc'],
        queryFn: async () => {
            const { data } = await apiTirelire.get('/api/kyc/status')
            return data.data
        },
    })
}

// Upload KYC
export const useUploadKYC = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const { data } = await apiTirelire.post('/api/kyc/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return data.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kyc'] })
        },
    })
}

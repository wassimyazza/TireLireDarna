import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateGroup } from '../../hooks/useTirelire'
import { toast } from 'react-toastify'

const CreateGroupPage: React.FC = () => {
    const navigate = useNavigate()
    const createGroup = useCreateGroup()
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        maxMembers: '',
        round: 'month',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await createGroup.mutateAsync({
                name: formData.name,
                amount: Number(formData.amount),
                maxMembers: Number(formData.maxMembers),
                round: formData.round as 'week' | 'month' | '15days',
            })

            toast.success('Group created')
            navigate('/tirelire/my-groups')
        } catch (error) {
            toast.error('Failed to create group')
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Create Group</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 font-semibold">Group Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full border rounded px-4 py-2"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-semibold">Contribution Amount (MAD)</label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Max Members</label>
                        <input
                            type="number"
                            value={formData.maxMembers}
                            onChange={(e) => setFormData({ ...formData, maxMembers: e.target.value })}
                            required
                            className="w-full border rounded px-4 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-semibold">Payment Round</label>
                    <select
                        value={formData.round}
                        onChange={(e) => setFormData({ ...formData, round: e.target.value })}
                        className="w-full border rounded px-4 py-2"
                    >
                        <option value="week">Weekly</option>
                        <option value="15days">Every 15 Days</option>
                        <option value="month">Monthly</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={createGroup.isPending}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                    {createGroup.isPending ? 'Creating...' : 'Create Group'}
                </button>
            </form>
        </div>
    )
}

export default CreateGroupPage

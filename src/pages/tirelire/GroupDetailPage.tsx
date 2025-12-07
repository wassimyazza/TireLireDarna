import React from 'react'
import { useParams } from 'react-router-dom'
import { useGroup } from '../../hooks/useTirelire'

const GroupDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const { data: group, isLoading } = useGroup(id!)

    if (isLoading) return <div className="spinner"></div>
    if (!group) return <div>Group not found</div>

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">{group.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">Group Info</h3>
                    <p>Amount: {group.amount} MAD</p>
                    <p>Members: {group.members.length}/{group.maxMembers}</p>
                    <p>Round: {group.round}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-semibold mb-4">Schedule</h3>
                    <p>Current Turn: {group.currentTurn}</p>
                    {group.nextDueDate && <p>Next Due: {new Date(group.nextDueDate).toLocaleDateString()}</p>}
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Members</h3>
                <ul className="space-y-2">
                    {group.members.map((member: any) => (
                        <li key={member.userId} className="flex justify-between">
                            <span>{member.name}</span>
                            <span className="text-gray-600">Turn {member.turn}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default GroupDetailPage

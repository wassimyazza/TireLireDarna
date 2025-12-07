import React from 'react'
import { useGroups } from '../../hooks/useTirelire'

const GroupsPage: React.FC = () => {
    const { data: groups, isLoading } = useGroups()

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">All Groups</h1>

            {isLoading ? (
                <div className="spinner"></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {groups?.map((group: any) => (
                        <div key={group._id} className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                            <p className="text-gray-600 mb-2">Amount: {group.amount} MAD</p>
                            <p className="text-gray-600 mb-2">Members: {group.members.length}/{group.maxMembers}</p>
                            <p className="text-gray-600">Round: {group.round}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default GroupsPage

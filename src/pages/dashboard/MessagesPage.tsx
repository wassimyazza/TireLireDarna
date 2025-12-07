import React from 'react'

const MessagesPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Messages</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600">No messages</p>
            </div>
        </div>
    )
}

export default MessagesPage

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import { config } from '../config/env'
import { tokenStorage } from '../api/client'

interface SocketContextType {
    socket: Socket | null
    isConnected: boolean
    joinRoom: (room: string) => void
    leaveRoom: (room: string) => void
    emit: (event: string, data: any) => void
    on: (event: string, handler: (...args: any[]) => void) => void
    off: (event: string) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined)

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [messageQueue, setMessageQueue] = useState<Array<{ event: string; data: any }>>([])

    useEffect(() => {
        const token = tokenStorage.getAccessToken()

        if (!token) {
            return
        }

        // TODO: Enable socket connection once Socket.IO is configured on backend
        console.log('Socket.IO disabled - backend not configured')
        return

        // const socketInstance = io(config.socket.url, {
        //     auth: {
        //         token,
        //     },
        //     reconnection: true,
        //     reconnectionAttempts: 5,
        //     reconnectionDelay: 1000,
        // })

        socketInstance.on('connect', () => {
            setIsConnected(true)

            // Flush message queue
            messageQueue.forEach(({ event, data }) => {
                socketInstance.emit(event, data)
            })
            setMessageQueue([])
        })

        socketInstance.on('disconnect', () => {
            setIsConnected(false)
        })

        socketInstance.on('error', (error: any) => {
            console.error('Socket error:', error)
        })

        setSocket(socketInstance)

        return () => {
            socketInstance.disconnect()
        }
    }, [])

    const joinRoom = useCallback((room: string) => {
        if (socket && isConnected) {
            socket.emit('join_room', room)
        }
    }, [socket, isConnected])

    const leaveRoom = useCallback((room: string) => {
        if (socket && isConnected) {
            socket.emit('leave_room', room)
        }
    }, [socket, isConnected])

    const emit = useCallback((event: string, data: any) => {
        if (socket && isConnected) {
            socket.emit(event, data)
        } else {
            // Queue message for later
            setMessageQueue(prev => [...prev, { event, data }])
        }
    }, [socket, isConnected])

    const on = useCallback((event: string, handler: (...args: any[]) => void) => {
        if (socket) {
            socket.on(event, handler)
        }
    }, [socket])

    const off = useCallback((event: string) => {
        if (socket) {
            socket.off(event)
        }
    }, [socket])

    const value: SocketContextType = {
        socket,
        isConnected,
        joinRoom,
        leaveRoom,
        emit,
        on,
        off,
    }

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export const useSocket = (): SocketContextType => {
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocket must be used within SocketProvider')
    }
    return context
}

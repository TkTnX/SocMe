'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getSocket } from '@/api/socket-api'

export function useConnectSocket(chatId: string) {
	const queryClient = useQueryClient()
	const socket = getSocket()

	useEffect(() => {
		const handleConnect = () => {
			socket.emit('join-room', chatId)
		}

		socket.on('connect', handleConnect)

		socket.on('new-message', () => {
			queryClient.invalidateQueries({ queryKey: ['chat', chatId] })
		})

		return () => {
			socket.off('connect', handleConnect)
			socket.off('new-message')
		}
	}, [chatId])
}

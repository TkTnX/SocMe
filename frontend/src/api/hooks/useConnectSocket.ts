'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getSocket } from '@/api/socket-api'

export function useConnectSocket(chatId: string) {
	const queryClient = useQueryClient()
	const socket = getSocket()

	useEffect(() => {
		socket.emit('join-room', chatId)

		const handleConnect = () => {
			socket.emit('join-room', chatId)
		}

		socket.on('connect', handleConnect)

		socket.on('send-message', () => {
			queryClient.invalidateQueries({ queryKey: ['chat', chatId] })
		})
		socket.on('edit-message', edited => {
			console.log(edited)
			queryClient.invalidateQueries({ queryKey: ['chat', chatId] })
		})
		socket.on('delete-message', () => {
			queryClient.invalidateQueries({ queryKey: ['chat', chatId] })
		})

		return () => {
			socket.off('connect', handleConnect)
			socket.off('send-message')
			socket.off('edit-message')
			socket.off('delete-message')
		}
	}, [chatId])
}

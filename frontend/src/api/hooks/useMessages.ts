import {  useMutation } from '@tanstack/react-query'

import { deleteMessage, editMessage } from '@/api/requests'
import { MessageSchema } from '@/shared/schemas'

export function useMessages() {

	const deleteMessageMutation = () =>
		useMutation({
			mutationFn: (messageId: string) => deleteMessage(messageId),
			mutationKey: ['delete message']
		})

	const editMessageMutation = (messageId: string) =>
		useMutation({
			mutationFn: (data: MessageSchema) => editMessage(messageId, data),
			mutationKey: ['delete message']
		})

	return {
		deleteMessageMutation,
		editMessageMutation
	}
}

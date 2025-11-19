import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { createMessage, deleteMessage, editMessage } from '@/api/requests'
import { IMessage } from '@/api/types'
import { MessageSchema } from '@/shared/schemas'

export function useMessages() {
	const createMessageMutation = (
		chatId: string,
		options?: Omit<
			UseMutationOptions<IMessage, any, unknown>,
			'mutationFn' | 'mutationKey'
		>
	) =>
		useMutation({
			mutationFn: (data: MessageSchema) => createMessage(chatId, data),
			mutationKey: ['create message'],
			...options
		})

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
		createMessageMutation,
		deleteMessageMutation,
		editMessageMutation
	}
}

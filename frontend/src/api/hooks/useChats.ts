import { UseMutationOptions, useMutation, useQuery } from '@tanstack/react-query';



import { createChat, deleteChat, getChat, getChats } from '@/api/requests';
import { IChat } from '@/api/types';





export function useChats() {
	const getChatsQuery = () =>
		useQuery({
			queryKey: ['chats'],
			queryFn: () => getChats()
		})

	const getChatQuery = (chatId: string) =>
		useQuery({
			queryKey: ['chat', chatId],
			queryFn: () => getChat(chatId)
		})

	const createChatMutation = (
		options?: Omit<
			UseMutationOptions<IChat | { chatId: string }, any, unknown>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['create chat'],
			mutationFn: (profileId: string) => createChat(profileId),
			...options
		})
	
	
	const deleteChatMutation = (		options?: Omit<
			UseMutationOptions<IChat | { chatId: string }, any, unknown>,
			'mutationKey' | 'mutationFn'
		>) => useMutation({
			mutationKey: ['delete chat'],
			mutationFn: (chatId: string) => deleteChat(chatId),
			...options
		})

	return {
		getChatsQuery,
		getChatQuery,
		createChatMutation,
		deleteChatMutation
	}
}
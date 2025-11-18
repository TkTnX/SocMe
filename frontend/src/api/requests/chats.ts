import { IChat } from '@/api/types'
import { axiosInstance } from '@/shared/lib'

export const getChats = async (): Promise<IChat[]> => {
	const { data } = await axiosInstance.get('/chats')

	return data
}

export const getChat = async (chatId: string): Promise<IChat> => {
	const { data } = await axiosInstance.get(`/chats/${chatId}`)

	return data
}

export const createChat = async (profileId: string): Promise<IChat> => {
	const { data } = await axiosInstance.post(`/chats/${profileId}`)
	return data
}

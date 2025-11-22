import { axiosInstance } from '@/shared/lib';
import { MessageSchema } from '@/shared/schemas';





export const createMessage = async (chatId: string, body: MessageSchema) => {
	const { data } = await axiosInstance.post(`/messages`, { ...body , chatId})

	return data
}

export const editMessage = async (messageId: string, body: MessageSchema) => {
	const { data } = await axiosInstance.patch(`/messages/${messageId}`, body)

	return data
}

export const deleteMessage = async (messageId: string) => {
	const { data } = await axiosInstance.delete(`/messages/${messageId}`)

	return data
}
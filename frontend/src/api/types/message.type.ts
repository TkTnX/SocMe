import { IChat } from "@/api/types/chat.type"
import { IUser } from "@/api/types/user.type"

export interface IMessage {
    id: string
    text: string
    image?: string

    user?: IUser
    userId: string
    chat?: IChat
    chatId: string

    createdAt: string
    updatedAt?: string
}
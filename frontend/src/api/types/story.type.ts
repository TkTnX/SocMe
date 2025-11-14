import { IUser } from "@/api/types/user.type"

export interface IStory {
    id: string

    text?: string
    image: string

    user?: IUser
    userId: string

    createdAt: string
}
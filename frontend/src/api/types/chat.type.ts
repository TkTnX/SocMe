import { IMessage, IUser } from "."

export interface IChat {
    id: string
    lastMessage?: string

    userOne?: IUser
    userOneId: string
    userTwo?: IUser
    userTwoId: string
    messages: IMessage[]

    createdAt: string

}
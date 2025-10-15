import { ILike, IPost } from "."

export interface IComment {
    id: string

    text: string
    image?: string

    likes: ILike[]

    createdAt: string
    updatedAt?: string

    post?: IPost
    postId: string
}
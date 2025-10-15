import { IPost, IUser } from "."

export interface IFavorite {
    id: string

    user?: IUser
    userId: string

    post?: IPost
    postId: string
}
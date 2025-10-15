import { IComment, IFavorite, IHashtag, ILike, IUser } from "."

export interface IPost {
    id: string
    text: string
    image?: string

    user: IUser
    userId: string

    comments: IComment[]
    likes: ILike[]
    favorites: IFavorite[]
    hashtags: IHashtag[]

    createdAt: string
    updatedAt?: string 
}

export interface IPostRequest {
    text: string
    image?:string
}
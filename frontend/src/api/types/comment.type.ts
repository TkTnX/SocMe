import { ILike, IPost, IUser } from ".";





export interface IComment {
	id: string

	text: string
	image?: string

	likes: ILike[]

	createdAt: string
	updatedAt?: string

	user?: IUser
	userId: string

	post?: IPost
	postId: string

	replies: IComment[]
	replyToId: string | null
}

export interface CommentRequest {
    text: string
    replyToId: string | null
    image: string | null
}
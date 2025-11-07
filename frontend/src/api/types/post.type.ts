import { IComment, IFavorite, IGroup, IHashtag, ILike, IUser } from '.'

export interface IPost {
	id: string
	text: string
	images: string[]

	user: IUser
	userId: string

	comments: IComment[]
	likes: ILike[]
	favorites: IFavorite[]
	hashtags: IHashtag[]

	groupId: string
	group?: IGroup

	createdAt: string
	updatedAt?: string
}

export interface IPostRequest {
	text: string
	images: string[]
	hashtags: string[]
}

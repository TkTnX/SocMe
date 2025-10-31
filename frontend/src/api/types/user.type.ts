import { IFavorite, IFollower, IHashtag, ILike, IPost } from ".";





export interface IUser {
	id: string
	name: string
	email: string
	password?: string

	bio?: string
	websites?: string[]
	hobby?: string
	avatar?: string
	cover?: string
	city?: string
	gender?: EGender

	provider: EProviders

	likes: ILike[]
	favorites: IFavorite[]
	followers: IFollower[]
	followings: IFollower[]
	posts: IPost[]
	hashtags: IHashtag[]
}

enum EProviders {
    CREDENTIALS,
    YANDEX,
    GOOGLE
}

enum EGender {
	MALE,
	FEMALE
}
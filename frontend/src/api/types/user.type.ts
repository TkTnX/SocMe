import { IFavorite, IFollower, IGroup, IGroupFollower, IHashtag, ILike, IPost } from ".";





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
	birthdayDate?: string

	provider: EProviders

	likes: ILike[]
	favorites: IFavorite[]
	followers: IFollower[]
	followings: IFollower[]
	posts: IPost[]
	hashtags: IHashtag[]
	groups: IGroup[]
	followingGroups: IGroupFollower[]
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
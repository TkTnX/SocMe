import { IPost, IUser } from '.'

export interface IGroup {
	id: string

	name: string
	avatar?: string
	cover?: string
	type: string
	description?: string
	phone?: string
	email?: string
	website?: string
	address?: string

	admins?: IUser[]
	followers?: IGroupFollower[]
	posts: IPost[]
}


export interface IGroupFollower {
    id: string

    user?: IUser
    userId: string

    group?: IGroup
    groupId: string
}
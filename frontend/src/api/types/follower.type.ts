import { IUser } from "."

export interface IFollower {
    id: string

    followingTo?: IUser
    followingToId: string

    follower?: IUser
    followerId: string
}
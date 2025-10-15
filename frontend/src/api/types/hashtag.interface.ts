import { IPost, IUser } from "."

export interface IHashtag {
    id: string

    name: string

    posts?: IPost[]
    users?: IUser[]
}
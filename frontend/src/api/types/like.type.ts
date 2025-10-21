import { IComment, IPost, IUser } from "."

export interface ILike {
    id: string

    type: ELikeType
    likedId: string

    user?: IUser
    userId: string

    post?: IPost
    postId?: string

    comment?: IComment
    comminetId?: string
    
    createdAt: string


}

export enum ELikeType {
  POST,
  COMMENT,
  HASHTAG
}
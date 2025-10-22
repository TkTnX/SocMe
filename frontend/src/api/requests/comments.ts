import { CommentRequest, IComment } from '@/api/types'
import { axiosInstance } from '@/shared/lib'

export const getPostComments = async (postId: string): Promise<IComment[]> => {
	const { data } = await axiosInstance.get(`/comments/${postId}`)

	return data
}

export const createComment = async (
	postId: string,
	body: CommentRequest
): Promise<IComment> => {
	const { data } = await axiosInstance.post(`/comments/${postId}`, body)

	return data
}

export const editComment = async (
	commentId: string,
	body: CommentRequest
): Promise<IComment> => {
	const { data } = await axiosInstance.patch(`/comments/${commentId}`, body)

	return data
}

export const deleteComment = async (commentId: string): Promise<IComment> => {
	const { data } = await axiosInstance.delete(`/comments/${commentId}`)

	return data
}

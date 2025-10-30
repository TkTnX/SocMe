import { IPost, IPostRequest } from '@/api/types'
import { axiosInstance } from '@/shared/lib'

export const getPosts = async () => {
	const { data } = await axiosInstance.get<IPost[]>('/posts')

	return data
}

export const getPostById = async (postId: string) => {
	const { data } = await axiosInstance.get<IPost>(`/posts/${postId}`)
	
	return data
}

export const createPost = async (values: IPostRequest) => {
	const { data } = await axiosInstance.post<IPost>('/posts', values)

	return data
}

export const editPost = async (values: IPostRequest, postId: string) => {
	const { data } = await axiosInstance.patch<IPost>(
		`/posts/${postId}`,
		values
	)

	return data
}

export const deletePost = async (postId: string) => {
	const { data } = await axiosInstance.delete(`/posts/${postId}`)

	return data
}

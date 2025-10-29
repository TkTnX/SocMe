import {
	UseMutationOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import { createPost, deletePost, editPost, getPosts } from '@/api/requests'
import { IPost, IPostRequest } from '@/api/types'
import { PostSchema } from '@/shared/schemas'

export function usePosts(userPosts?: IPost[]) {
	const {
		data: posts,
		isLoading,
		error
	} = useQuery({
		queryKey: ['posts', userPosts],
		queryFn: () => getPosts(),
		enabled: !userPosts,
		initialData: userPosts
	})

	const createPostMutation = (
		options?: Omit<
			UseMutationOptions<PostSchema, unknown, PostSchema>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['create posts'],
			mutationFn: async (values: IPostRequest) =>
				await createPost(values),
			...options
		})

	const editPostMutation = (
		postId: string,
		options?: Omit<
			UseMutationOptions<PostSchema, unknown, PostSchema>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['edit post'],
			mutationFn: async (values: IPostRequest) =>
				await editPost(values, postId),
			...options
		})

	const deletePostMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['delete post'],
			mutationFn: async (postId: string) => await deletePost(postId),
			...options
		})

	return {
		posts,
		isLoading,
		error,
		createPostMutation,
		editPostMutation,
		deletePostMutation
	}
}

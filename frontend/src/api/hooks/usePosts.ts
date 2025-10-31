import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';



import { createPost, deletePost, editPost, getPostById, getPosts } from '@/api/requests';
import { IPost, IPostRequest } from '@/api/types';
import { PostSchema } from '@/shared/schemas';





export function usePosts(userPosts?: IPost[], hashtag?: string) {
	const {
		data: posts,
		isLoading,
		error
	} = useQuery({
		queryKey: ['posts', userPosts, hashtag],
		queryFn: () => getPosts(hashtag),
		enabled: !userPosts,
		initialData: userPosts
	})

	const getPostByIdQuery = (
		postId: string,
		options?: Omit<
			UseQueryOptions<any, unknown, any>,
			'queryKey' | 'queryFn'
		>
	) =>
		useQuery({
			queryKey: ['get post by id', postId],
			queryFn: () => getPostById(postId),
			...options
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
		getPostByIdQuery,
		createPostMutation,
		editPostMutation,
		deletePostMutation
	}
}
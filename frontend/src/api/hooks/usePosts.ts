import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query';



import { createPost, deletePost, editPost, getPostById, getPosts } from '@/api/requests';
import { IPost, IPostRequest } from '@/api/types';
import { PostSchema } from '@/shared/schemas';





export function usePosts(userPosts?: IPost[], query?: Record<string, string>) {
	const {
		data: posts,
		isLoading,
		error
	} = useQuery({
		queryKey: ['posts', userPosts, query],
		queryFn: () => getPosts(query),
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

	// МУТАЦИЯ СОЗДАНИЯ ПОСТА
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

	
	// МУТАЦИЯ РЕДАКТИРОВАНИЯ ПОСТА
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

	
	// МУТАЦИЯ УДАЛЕНИЯ ПОСТА
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
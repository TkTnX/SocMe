import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query'

import { createPost, getPosts } from '@/api/requests'
import { IPostRequest } from '@/api/types'
import { PostSchema } from '@/shared/schemas'

export function usePosts() {
	const {
		data: posts,
		isLoading,
		error
	} = useQuery({
		queryKey: ['posts'],
		queryFn: () => getPosts()
	})

	const createPostMutation = (options?: Omit<UseMutationOptions<PostSchema, unknown, PostSchema>, "mutationKey" | "mutationFn">) =>
		useMutation({
			mutationKey: ['create posts'],
			mutationFn: async (values: IPostRequest) => await createPost(values),
			...options
		})

	return {
		posts,
		isLoading,
		error,
		createPostMutation
	}
}

import { useMutation, useQuery } from '@tanstack/react-query'

import { createPost, getPosts } from '@/api/requests'
import { IPostRequest } from '@/api/types'

export function usePosts() {
	const {
		data: posts,
		isLoading,
		error
	} = useQuery({
		queryKey: ['get posts'],
		queryFn: () => getPosts()
	})

	const createPostMutation = useMutation({
		mutationKey: ['create posts'],
		mutationFn: async (values: IPostRequest) =>await createPost(values)
	})

	return {
		posts,
		isLoading,
		error,
		createPostMutation
	}
}

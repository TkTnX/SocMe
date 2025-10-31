import {
	UseMutationOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import { addHashtagToFavorites, getHashtags } from '@/api/requests'

export function useHashtags() {
	const getHashtagsQuery = (query?: string) =>
		useQuery({
			queryKey: ['hashtags', query],
			queryFn: () => getHashtags(query)
		})

	const addHashtagToFavoritesMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['add hashtag to favorites'],
			mutationFn: (hashtagId: string) => addHashtagToFavorites(hashtagId),
			...options
		})

	return {
		getHashtagsQuery,
		addHashtagToFavoritesMutation
	}
}

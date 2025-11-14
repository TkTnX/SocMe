import { useMutation, useQuery } from '@tanstack/react-query'

import { createStory, deleteStory, getStories } from '@/api/requests'

export function useStories() {
	const getStoriesQuery = () =>
		useQuery({
			queryKey: ['stories'],
			queryFn: () => getStories()
		})

	const createStoryMutation = () =>
		useMutation({
			mutationKey: ['create story'],
			// TODO: ADD TYPE
			mutationFn: (body: any) => createStory(body)
		})

	const deleteStoryMutation = () =>
		useMutation({
			mutationKey: ['delete story'],
			mutationFn: (storyId: string) => deleteStory(storyId)
		})

	return {
		getStoriesQuery,
		createStoryMutation,
		deleteStoryMutation
	}
}

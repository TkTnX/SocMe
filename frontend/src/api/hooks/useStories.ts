import { UseMutationOptions, useMutation, useQuery } from '@tanstack/react-query';



import { createStory, deleteStory, getStories } from '@/api/requests';
import { StorySchema } from '@/shared/schemas';





export function useStories() {
	const getStoriesQuery = () =>
		useQuery({
			queryKey: ['stories'],
			queryFn: () => getStories()
		})

	const createStoryMutation = (
		options?: Omit<
			UseMutationOptions<unknown, any, unknown>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['create story'],
			mutationFn: (body: StorySchema) => createStory(body),
			...options
		})

	const deleteStoryMutation = (options?: Omit<UseMutationOptions<unknown, any, unknown>, "mutationKey" | "mutationFn">) =>
		useMutation({
			mutationKey: ['delete story'],
			mutationFn: (storyId: string) => deleteStory(storyId),
			...options
		})

	return {
		getStoriesQuery,
		createStoryMutation,
		deleteStoryMutation
	}
}
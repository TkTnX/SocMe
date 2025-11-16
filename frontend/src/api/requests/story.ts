import { IStory } from '@/api/types'
import { axiosInstance } from '@/shared/lib'
import { StorySchema } from '@/shared/schemas'

export const getStories = async (): Promise<IStory[]> => {
	const { data } = await axiosInstance.get('/stories')

	return data
}

export const createStory = async (body: StorySchema): Promise<IStory> => {
	const { data } = await axiosInstance.post('/stories', body)

	return data
}

export const deleteStory = async (storyId: string): Promise<IStory> => {
	const { data } = await axiosInstance.delete(`/stories/${storyId}`)

	return data
}

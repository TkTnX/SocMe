import { IStory } from '@/api/types'
import { axiosInstance } from '@/shared/lib'

export const getStories = async (): Promise<IStory[]> => {
	const { data } = await axiosInstance.get('/stories')

	return data
}

// TODO: ADD TYPE
export const createStory = async (body: any): Promise<IStory> => {
	const { data } = await axiosInstance.post('/stories', body)

	return data
}

export const deleteStory = async (storyId: string): Promise<IStory> => {
	const { data } = await axiosInstance.delete(`/stories/${storyId}`)

	return data
}

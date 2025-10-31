import { IHashtag } from '@/api/types';
import { axiosInstance } from '@/shared/lib';





export const getHashtags = async (query?: string) => {
	const { data } = await axiosInstance.get<Promise<IHashtag[]>>(
		`/hashtags?name=${query}`
	)

	return data
}


export const addHashtagToFavorites = async (hashtagId: string) => {
	const { data } = await axiosInstance.post<Promise<IHashtag>>(
		`/hashtags/${hashtagId}`
	)

	return data
}
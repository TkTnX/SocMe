import { axiosInstance } from '@/shared/lib'

export const follow = async (followingToId: string, type: string) => {
	const { data } = await axiosInstance.post(`/followers/${followingToId}/${type}`)

	return data
}

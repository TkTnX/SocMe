import { axiosInstance } from '@/shared/lib'

export const follow = async (followingToId: string) => {
	const { data } = await axiosInstance.post(`/followers/${followingToId}`)

	return data
}

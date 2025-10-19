import { IUser } from '@/api/types';
import { axiosInstance } from '@/lib';





export const getUser = async () => {
	const { data } = await axiosInstance.get<Promise<IUser>>('/auth/@me')
	return data
}

export const getUserById = async (userId: string) => {
	const { data } = await axiosInstance.get<Promise<IUser>>(`/users/${userId}`)

	return data
}
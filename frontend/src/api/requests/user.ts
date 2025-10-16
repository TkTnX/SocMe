import { IUser } from '@/api/types'
import { axiosInstance } from '@/lib'

export const getUser = async () => {
	const { data } = await axiosInstance.get<Promise<IUser>>('/auth/@me')
	return data
}

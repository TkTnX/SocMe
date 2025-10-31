import { IUser } from '@/api/types';
import { axiosInstance } from '@/shared/lib';
import { EditProfileSchema } from '@/shared/schemas';





export const getUsers = async (isPeoplePage: boolean = false, query?: string) => {
	let queryString = '?'

	if (isPeoplePage) queryString = queryString + `isPeoplePage=${isPeoplePage}&`
	if(query) queryString = queryString + `query=${query}&`


	const { data } = await axiosInstance.get<Promise<IUser[]>>(
		`/users${queryString}`
	)

	return data
}

export const getUser = async () => {
	const { data } = await axiosInstance.get<Promise<IUser>>('/auth/@me')
	return data
}

export const getUserById = async (userId: string) => {
	const { data } = await axiosInstance.get<Promise<IUser>>(`/users/${userId}`)

	return data
}

export const editUserProfile = async (body: Partial<EditProfileSchema>) => {
	const { data } = await axiosInstance.patch(`/users/edit`, body)

	return data
}
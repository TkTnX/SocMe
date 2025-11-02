import { IUser } from '@/api/types'
import { axiosInstance } from '@/shared/lib'
import { EditProfileSchema } from '@/shared/schemas'

export const getUsers = async (
	isPeoplePage: boolean = false,
	query?: Record<string, string>
) => {
	const params = new URLSearchParams()

	if (isPeoplePage) params.append('isPeoplePage', String(isPeoplePage))

	Object.entries(query || {}).forEach(([key, value]) => {
		if (value) params.append(key, value)
	})

	const { data } = await axiosInstance.get<Promise<IUser[]>>(
		`/users?${params.toString()}`
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

export const editUserProfile = async (
	body: Partial<Omit<EditProfileSchema, 'websites'>> & {
		websites?: string[]
	}
) => {
	const { data } = await axiosInstance.patch(`/users/edit`, body)

	return data
}

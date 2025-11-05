import { IGroup } from '@/api/types';
import { axiosInstance } from '@/shared/lib';





export const getGroups = async (query?: Record<string, string>) => {
	const params = new URLSearchParams()

	Object.entries(query || {}).forEach(([key, value]) => {
		if (value) params.append(key, value)
	})

	const { data } = await axiosInstance.get<Promise<IGroup[]>>(`/groups?${params.toString()}`)
	return data
}

export const getGroupById = async (groupId: string) => {
	const { data } = await axiosInstance.get<Promise<IGroup>>(
		`/groups/${groupId}`
	)
	return data
}

// TODO: ADD TYPE
export const createGroup = async (body: any) => {
	const { data } = await axiosInstance.post<Promise<IGroup>>(
		`/groups`,
		body
	)
	return data
}

// TODO: ADD TYPE
export const editGroup = async (groupId: string, body: any) => {
	const { data } = await axiosInstance.patch<Promise<IGroup>>(
		`/groups/${groupId}`,
		body
	)
	return data
}

export const deleteGroup = async (groupId: string) => {
	const { data } = await axiosInstance.delete<Promise<IGroup>>(
		`/groups/${groupId}`
	)

	return data
}
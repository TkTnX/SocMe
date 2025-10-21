import { useQuery } from '@tanstack/react-query'

import { getUser, getUserById, getUsers } from '@/api/requests'

export function useUser() {

	const getUsersQuery = () => useQuery({
		queryKey: ['users'],
		queryFn: () => getUsers()
	})

	const {
		data: user,
		isPending: isUserPending,
		error: userError
	} = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser()
	})

	const getUserByIdQuery = (userId: string) => {
		return useQuery({
			queryKey: ['user by id', userId],
			queryFn: () => getUserById(userId!),
			enabled: !!userId
		})
	}

	return {
		user: user || null,
		isUserPending,
		userError,
		getUserByIdQuery,
		getUsersQuery
	}
}

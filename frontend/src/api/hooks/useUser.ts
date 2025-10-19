import { useQuery } from '@tanstack/react-query';
import Cookie from 'js-cookie';



import { getUser, getUserById } from '@/api/requests';





export function useUser(userId?: string) {
	const token = Cookie.get('accessToken')
	const {
		data: user,
		isPending: isUserPending,
		error: userError
	} = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(),
		enabled: !!token
	})


	const getUserByIdQuery = (userId: string) => {
		return useQuery({
			queryKey: ['user by id'],
			queryFn: () => getUserById(userId!),
			enabled: !!userId
		})
	}

	return {
		user: user || null,
		isUserPending,
		userError,
		getUserByIdQuery
	}
}
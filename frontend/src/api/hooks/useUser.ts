import { useQuery } from '@tanstack/react-query'
import Cookie from 'js-cookie'

import { getUser } from '@/api/requests'

export function useUser() {
	const token = Cookie.get('accessToken')
	console.log(token)
	const {
		data: user,
		isPending: isUserPending,
		error: userError
	} = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(),
		enabled: !!token
	})

	return {
		user: user || null,
		isUserPending,
		userError
	}
}

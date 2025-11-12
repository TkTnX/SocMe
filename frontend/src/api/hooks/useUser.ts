import {
	UseMutationOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import { editUserProfile, getUser, getUserById, getUsers } from '@/api/requests'
import { EditProfileSchema } from '@/shared/schemas'

export function useUser() {
	const getUsersQuery = (
		isPeoplePage?: boolean,
		query?: Record<string, string>
	) =>
		useQuery({
			queryKey: ['users', query],
			queryFn: () => getUsers(isPeoplePage, query)
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

	const editUserProfileMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['edit profile'],
			mutationFn: (
				body: Partial<Omit<EditProfileSchema, 'websites'>> & {
					websites?: string[]
				}
			) => editUserProfile(body),
			...options
		})

	return {
		user: user || null,
		isUserPending,
		userError,
		getUserByIdQuery,
		getUsersQuery,
		editUserProfileMutation
	}
}

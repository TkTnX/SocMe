import {
	UseMutationOptions,
	useMutation,
	useQuery
} from '@tanstack/react-query'

import {
	createGroup,
	deleteGroup,
	editGroup,
	getGroupById,
	getGroups
} from '@/api/requests'

export function useGroups() {
	const getGroupsQuery = (query?: Record<string, string>) =>
		useQuery({
			queryKey: ['groups', query],
			queryFn: () => getGroups(query)
		})

	const getGroupByIdQuery = (id: string) =>
		useQuery({
			queryKey: ['group', id],
			queryFn: () => getGroupById(id)
		})

	// TODO: ADD TYPE
	const createGroupMutation = (
		options?: UseMutationOptions<unknown, any, unknown>
	) =>
		useMutation({
			mutationFn: (body: any) => createGroup(body),
			...options
		})

	// TODO: ADD TYPE
	const editGroupMutation = (
		groupId: string,
		options?: UseMutationOptions<unknown, any, unknown>
	) =>
		useMutation({
			mutationFn: (body: any) => editGroup(groupId, body),
			...options
		})

	const deleteGroupMutation = (
		groupId: string,
		options?: UseMutationOptions<unknown, any, unknown>
	) =>
		useMutation({
			mutationFn: () => deleteGroup(groupId)
		})

	return {
		getGroupsQuery,
		getGroupByIdQuery,
		createGroupMutation,
		editGroupMutation,
		deleteGroupMutation,
	}
}

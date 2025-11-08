import { UseMutationOptions, useMutation, useQuery } from '@tanstack/react-query';



import { createGroup, deleteGroup, editGroup, getGroupById, getGroups } from '@/api/requests';
import { CreateGroupSchema, EditGroupSchema } from '@/shared/schemas';
import { IGroup } from '@/api/types';





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


	const createGroupMutation = (
		options?: UseMutationOptions<IGroup, any, CreateGroupSchema>
	) =>
		useMutation({
			mutationFn: (body: CreateGroupSchema) => createGroup(body),
			...options
		})

	const editGroupMutation = (
		groupId: string,
		options?: UseMutationOptions<unknown, any, unknown>
	) =>
		useMutation({
			mutationFn: (body: EditGroupSchema) => editGroup(groupId, body),
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
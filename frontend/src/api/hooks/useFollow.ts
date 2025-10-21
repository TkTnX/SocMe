import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { follow } from '@/api/requests'

export function useFollow() {
	const followMutation = (followingToId: string, options?: Omit<UseMutationOptions<any, unknown, any>, "mutationKey" | "mutationFn">) =>
		useMutation({
			mutationKey: ['follow'],
			mutationFn: () => follow(followingToId),
			...options
		})

	return {
		followMutation
	}
}

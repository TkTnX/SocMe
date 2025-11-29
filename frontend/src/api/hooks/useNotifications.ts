import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { deleteNotification, updateNotificationStatus } from '@/api/requests'

export function useNotifications() {
	const updateNotificationStatusMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationFn' | 'mutationKey'
		>
	) =>
		useMutation({
			mutationFn: () => updateNotificationStatus(),
			mutationKey: ['update notifications status'],
			...options
		})

	const deleteNotificationMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationFn' | 'mutationKey'
		>
	) =>
		useMutation({
			mutationFn: (notificationId: string) =>
				deleteNotification(notificationId),
			mutationKey: ['delete notification'],
			...options
		})

	return {
		updateNotificationStatusMutation,
		deleteNotificationMutation
	}
}

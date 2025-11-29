import { useQueryClient } from '@tanstack/react-query'
import { X } from 'lucide-react'

import { useNotifications } from '@/api/hooks'

interface Props {
	notificationId: string
}

export const DeleteNotificationButton = ({ notificationId }: Props) => {
	const { deleteNotificationMutation } = useNotifications()
	const queryClient = useQueryClient()
	const { mutate } = deleteNotificationMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
	})
	return (
		<button
			onClick={() => mutate(notificationId)}
			className='absolute top-2 right-2 text-red-500'
		>
			<X size={20} />
		</button>
	)
}

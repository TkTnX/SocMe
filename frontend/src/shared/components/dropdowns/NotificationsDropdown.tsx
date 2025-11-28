import Image from 'next/image'

import { INotification } from '@/api/types'
import { Notification } from '@/entities'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/components/ui'

type Props = {
	notifications: INotification[]
}

export const NotificationsDropdown = ({ notifications }: Props) => {
	const unreadNotifications = notifications.filter(
		notif => notif.isRead === false
	)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='relative'>
				{unreadNotifications.length ? (
					<div className='bg-main absolute right-0 h-2 w-2 rounded-full' />
				) : (
					''
				)}
				<Image
					src={'/images/icons/navbar/04.svg'}
					alt='Уведомления'
					width={28}
					height={28}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='px-4 py-2'>
				<h4 className='font-bold'>
					Уведомления{' '}
					<span className='text-main'>
						({unreadNotifications.length})
					</span>
				</h4>
				<div className='max-h- mt-4 flex flex-col gap-1'>
					{notifications.map(notification => (
						<Notification
							key={notification.id}
							notification={notification}
						/>
					))}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

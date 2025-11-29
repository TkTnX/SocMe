import Image from 'next/image'

import { INotification } from '@/api/types'
import { DeleteNotificationButton } from '@/features'
import { cn } from '@/shared/lib'

interface Props {
	notification: INotification
}

export const Notification = ({ notification }: Props) => {
	return (
		<div
			className={cn(
				'border-main text-main relative flex w-full items-center gap-3 rounded-2xl border py-2 pr-6 pl-4',
				{ 'bg-main text-white': !notification.isRead }
			)}
		>
			{notification.icon && (
				<div
					className={cn('w-fit rounded-full bg-white p-2', {
						'bg-main': notification.isRead
					})}
				>
					<Image
						src={notification.icon}
						alt={notification.title}
						className={cn('w-fit rounded-full object-cover', {
							'invert-100': notification.isRead
						})}
						width={18}
						height={18}
					/>
				</div>
			)}
			<div className='w-full'>
				<h6 className='font-bold'>{notification.title}</h6>
				{notification.content && (
					<p className='text-xs'>{notification.content}</p>
				)}
				<p className='text-right text-xs text-gray-500'>
					{new Date(notification.createdAt).toLocaleDateString(
						'ru-RU'
					)}
				</p>
				<DeleteNotificationButton notificationId={notification.id} />
			</div>
		</div>
	)
}

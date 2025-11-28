import Image from 'next/image'

import { INotification } from '@/api/types'
import { cn } from '@/shared/lib'

interface Props {
	notification: INotification
}

export const Notification = ({ notification }: Props) => {
	return (
		<div
			className={cn(
				'border-main text-main flex items-center gap-3 rounded-2xl border px-4 py-2',
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
						className='rounded-full object-cover'
						width={18}
						height={18}
					/>
				</div>
			)}
			<div>
				<h6 className='font-bold'>{notification.title}</h6>
				{notification.content && (
					<p className='text-xs'>{notification.content}</p>
				)}
			</div>
		</div>
	)
}

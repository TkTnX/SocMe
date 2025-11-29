'use client'

import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useNotifications } from '@/api/hooks'
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
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { updateNotificationStatusMutation } = useNotifications()
	const unreadNotifications = notifications.filter(
		notif => notif.isRead === false
	)

	const { mutate } = updateNotificationStatusMutation({
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] })
	})

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<li className='relative flex'>
				<DropdownMenuTrigger className='relative'>
					{unreadNotifications.length ? (
						<div className='bg-main absolute right-0 h-2 w-2 rounded-full' />
					) : (
						''
					)}
					<Image
						className='dark:invert-100'
						src={'/images/icons/navbar/04.svg'}
						alt='Уведомления'
						width={28}
						height={28}
					/>
				</DropdownMenuTrigger>
			</li>
			<DropdownMenuContent className='px-4 py-2'>
				<h4 className='font-bold'>
					Уведомления{' '}
					<span className='text-main'>({notifications.length})</span>
				</h4>
				{unreadNotifications.length > 0 && (
					<button onClick={() => mutate({})}>Прочитать всё</button>
				)}
				<div className='mt-4 flex max-h-[400px] flex-col gap-1 overflow-y-auto'>
					{notifications.length > 0 ? (
						notifications.map(notification => (
							<Notification
								key={notification.id}
								notification={notification}
							/>
						))
					) : (
						<p className='px-4 text-gray-500'>Уведомлений нет!</p>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

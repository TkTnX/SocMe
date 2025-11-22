'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useUser } from '@/api/hooks'
import { IChat } from '@/api/types'
import { ChatItemDropdown } from '@/shared/components'
import { cn } from '@/shared/lib'

interface Props {
	chat: IChat
}

export const ChatItem = ({ chat }: Props) => {
	const pathname = usePathname()
	const { user } = useUser()
	const interlocutor =
		user?.id === chat.userOneId ? chat.userTwo : chat.userOne

	return (
		<Link
			href={`/chats/${chat.id}`}
			className={cn(
				'flex items-center justify-between gap-2 rounded-2xl px-4 py-2',
				{
					'bg-main/10': pathname === `/chats/${chat.id}`
				}
			)}
		>
			<div className='flex items-start gap-2'>
				<Image
					src={interlocutor?.avatar || '/images/icons/no-avatar.svg'}
					alt={interlocutor?.name || ''}
					className='max-h-[40px] max-w-[40px] rounded-full object-cover'
					width={40}
					height={40}
				/>
				<div className='overflow-x-hidden'>
					<h6>{interlocutor?.name}</h6>
					<p className='text-xs text-nowrap text-gray-500'>
						{chat.lastMessage
							? chat.lastMessage
							: 'Напишите что-то'}
					</p>
				</div>
			</div>
			<ChatItemDropdown chatId={chat.id} />
		</Link>
	)
}

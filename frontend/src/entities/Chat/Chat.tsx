'use client'

import { MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useChats, useConnectSocket, useUser } from '@/api/hooks'
import { Message, UserTitle } from '@/entities'
import { CreateMessageForm } from '@/features'
import { Skeleton } from '@/shared/components'

interface Props {
	chatId: string
}

// TODO: Редактирование сообщения
// TODO: Добавление изображений
// TODO: Сейчас JWT токен не обновляется

export const Chat = ({ chatId }: Props) => {
	const { getChatQuery } = useChats()
	const { user } = useUser()
	const { data, isPending, error } = getChatQuery(chatId)
	const router = useRouter()
	useConnectSocket(chatId)

	const interlocutor =
		user?.id === data?.userOneId ? data?.userTwo : data?.userOne

	if (error) return router.push('/profile')
	return (
		<div className='flex h-full flex-col'>
			<div className='bg-main/70 flex items-center justify-between p-4'>
				{isPending ? (
					<Skeleton className='h-10 w-[150px] bg-gray-400' />
				) : (
					<UserTitle user={interlocutor!} />
				)}
				<button>
					<MoreHorizontal />
				</button>
			</div>

			<div className='flex flex-1 flex-col-reverse overflow-y-auto p-4'>
				{data?.messages.length === 0 && (
					<p className='flex h-full items-center justify-center gap-1 text-center'>
						Начните общение с
						<span className='text-main'> {interlocutor?.name}</span>
					</p>
				)}
				<div className='flex flex-col gap-2'>
					{data?.messages.map(message => (
						<Message message={message} key={message.id} />
					))}
				</div>
			</div>

			<CreateMessageForm chatId={chatId} />
		</div>
	)
}

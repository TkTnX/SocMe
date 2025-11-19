'use client'

import { MoreHorizontal } from 'lucide-react'

import { useChats, useUser } from '@/api/hooks'
import { Message, UserTitle } from '@/entities'
import { CreateMessageForm } from '@/features'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	chatId: string
}

export const Chat = ({ chatId }: Props) => {
	const { getChatQuery } = useChats()
	const { user } = useUser()
	const { data, isPending, error } = getChatQuery(chatId)
	const interlocutor =
		user?.id === data?.userOneId ? data?.userTwo : data?.userOne

	if (error) return <ErrorMessage error={error as ErrorType} />
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

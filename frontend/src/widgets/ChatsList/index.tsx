'use client'

import { useChats } from '@/api/hooks'
import { ChatItem } from '@/entities'
import { ChatsSearch } from '@/features'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const ChatsList = () => {
	const { getChatsQuery } = useChats()
	const { data, isPending, error } = getChatsQuery()

	return (
		<Block className='h-full min-h-[calc(100vh-150px)] w-full max-w-[250px]'>
			<h5 className='text-main'>Список чатов</h5>
			<ChatsSearch />
			{error ? (
				<ErrorMessage error={error as ErrorType} />
			) : (
				<div className='mt-4 flex flex-col'>
					{isPending ? (
						[...new Array(5)].map((_, index) => (
							<Skeleton
								key={index}
								className='mb-2 h-10 w-full'
							/>
						))
					) : data.length > 0 ? (
						data.map(chat => <ChatItem chat={chat} key={chat.id} />)
					) : (
						<p className='text-center text-gray-500'>Чатов нет</p>
					)}
				</div>
			)}
		</Block>
	)
}

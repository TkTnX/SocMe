'use client'

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useChats, useUser } from '@/api/hooks'
import { ChatItem } from '@/entities'
import { ChatsSearch } from '@/features'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { cn } from '@/shared/lib'
import { ErrorType } from '@/shared/types'

export const ChatsList = () => {
	const { user } = useUser()
	const [search, setSearch] = useState('')
	const { getChatsQuery } = useChats()
	const { data, isPending, error } = getChatsQuery()
	const pathname = usePathname()

	const filtered = data?.filter(
		chat =>
			(chat.userOne?.name.includes(search) &&
				chat.userOneId !== user?.id) ||
			(chat.userTwo?.name.includes(search) && chat.userTwoId !== user?.id)
	)
	return (
		<Block
			className={cn(
				'hidden h-full min-h-[calc(100vh-150px)] md:block md:w-full md:max-w-[250px]',
				{ 'block w-full': pathname === '/chats' }
			)}
		>
			<h5 className='text-main'>Список чатов</h5>
			<ChatsSearch search={search} setSearch={setSearch} />
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
						filtered?.map(chat => (
							<ChatItem chat={chat} key={chat.id} />
						))
					) : (
						<p className='text-center text-gray-500'>Чатов нет</p>
					)}
				</div>
			)}
		</Block>
	)
}

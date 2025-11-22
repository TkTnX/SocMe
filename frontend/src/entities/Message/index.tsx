'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

import { useUser } from '@/api/hooks'
import { IMessage } from '@/api/types'
import { CreateMessageForm } from '@/features'
import { MessageDropdown } from '@/shared/components'
import { cn } from '@/shared/lib'

interface Props {
	message: IMessage
}

export const Message = ({ message }: Props) => {
	const { user } = useUser()
	const [openEdit, setOpenEdit] = useState(false)
	const isUserMessage = message.userId === user?.id
	return (
		<div
			className={cn(
				'group relative w-fit max-w-[400px] rounded-2xl border-2 py-2 pr-6 pl-4',
				{ 'bg-main ml-auto text-white': isUserMessage }
			)}
		>
			{openEdit ? (
				<CreateMessageForm setOpenEdit={setOpenEdit} chatId={message.id} message={message} />
			) : (
				<p>{message.text}</p>
			)}

			<span
				className={cn('block text-left text-[8px] text-gray-300', {
					'text-right': isUserMessage
				})}
			>
				{new Date(message.createdAt).toLocaleDateString('ru-RU')}
			</span>
			{openEdit && (
				<button
					className='absolute top-3 right-3'
					onClick={() => setOpenEdit(false)}
				>
					<X />
				</button>
			)}
			{isUserMessage && (
				<MessageDropdown
					setOpenEdit={setOpenEdit}
					messageId={message.id}
					chatId={message.chatId}
				/>
			)}
		</div>
	)
}

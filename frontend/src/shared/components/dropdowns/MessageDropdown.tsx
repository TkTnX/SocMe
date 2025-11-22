'use client'

import { MoreVerticalIcon } from 'lucide-react'

import {
    Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui'

import { DeleteMessageButton } from '@/features'

interface Props {
	messageId: string
    chatId: string,
    setOpenEdit: (bool: boolean) => void
}

export const MessageDropdown = ({ messageId, chatId, setOpenEdit }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className='absolute top-1 right-1 opacity-0 transition group-hover:opacity-100'>
					<MoreVerticalIcon size={16} color='#fff' />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='ml-auto flex flex-col gap-2 p-3'>
				<DropdownMenuItem asChild>
					<Button onClick={() => setOpenEdit(true)}>Редактировать</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteMessageButton
						chatId={chatId}
						messageId={messageId}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

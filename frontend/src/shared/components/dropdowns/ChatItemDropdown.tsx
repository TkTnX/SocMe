'use client'

import { useQueryClient } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui'

import { useChats } from '@/api/hooks'
import { showErrorMessage } from '@/shared/helpers'

interface Props {
	chatId: string
}

export const ChatItemDropdown = ({ chatId }: Props) => {
	const { deleteChatMutation } = useChats()
	const queryClient = useQueryClient()
	const router = useRouter()
	const { mutate } = deleteChatMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['chats'] })
			router.push('/chats')
		},
		onError: error => showErrorMessage(error)
	})
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button>
					<MoreVertical />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='ml-auto flex flex-col gap-2 p-3'>
				<DropdownMenuItem asChild>
					<Button onClick={() => mutate(chatId)}>Удалить чат</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

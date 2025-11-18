'use client'

import { useRouter } from 'next/navigation'

import { useChats } from '@/api/hooks'
import { Button } from '@/shared/components'

interface Props {
	profileId: string | undefined
}

export const CreateChatButton = ({ profileId }: Props) => {
	const { createChatMutation } = useChats()
	const router = useRouter()
	const { mutate, isPending } = createChatMutation({
		onSuccess: data => {
			if ('chatId' in data) {
				router.push(`/chats/${data.chatId}`)
			} else {
				router.push(`/chats/${data.id}`)
			}
		}
	})

	return (
		<Button
			className='flex-1'
			onClick={() => mutate(profileId!)}
			disabled={isPending}
		>
			Написать
		</Button>
	)
}

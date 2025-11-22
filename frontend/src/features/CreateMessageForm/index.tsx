'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { useMessages } from '@/api/hooks'
import { getSocket } from '@/api/socket-api'
import { Button, Form } from '@/shared/components'
import { MessageSchema, messageSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	chatId: string
}

export const CreateMessageForm = ({ chatId }: Props) => {
	const { createMessageMutation } = useMessages()
	const { mutate, isPending } = createMessageMutation(chatId)
	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			text: '',
			image: null
		}
	})

	const onSubmit = async (values: MessageSchema) => {
		if (values.text.length === 0) return
		const socket = getSocket()

		socket.emit('send-message', { ...values, chatId })
		socket.emit('new-message')
		form.reset()
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-2 flex w-full items-center px-4'
			>
				<FormInput
					className='w-full rounded-r-none'
					form={form}
					name='text'
					placeholder='Написать...'
					isShowErrorMessage={false}
				/>
				<Button
					disabled={isPending}
					type='submit'
					className='rounded-l-none'
					size={'icon'}
				>
					<Send />
				</Button>
			</form>
		</Form>
	)
}

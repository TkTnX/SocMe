'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { getSocket } from '@/api/socket-api'
import { IMessage } from '@/api/types'
import { Button, Form } from '@/shared/components'
import { MessageSchema, messageSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	chatId: string
	message?: IMessage
	setOpenEdit?: (bool: boolean) => void
}

export const CreateMessageForm = ({ chatId, message, setOpenEdit }: Props) => {
	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			text: message?.text || '',
			image: message?.image || null
		}
	})

	const onSubmit = async (values: MessageSchema) => {
		if (values.text.length === 0) return
		const socket = getSocket()

		if (message) {
			socket.emit('edit-message', {
				...values,
				chatId,
				messageId: message.id
			})
		} else {
			socket.emit('send-message', { ...values, chatId })
		}
		form.reset()
		setOpenEdit?.(false)
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
				<Button type='submit' className='rounded-l-none' size={'icon'}>
					<Send />
				</Button>
			</form>
		</Form>
	)
}

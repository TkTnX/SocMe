'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Paperclip, Send } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUploads } from '@/api/hooks'
import { getSocket } from '@/api/socket-api'
import { IMessage } from '@/api/types'
import { EditPhotoInput } from '@/features/EditPhotoInput'
import { Button, Form, FormField } from '@/shared/components'
import { MessageSchema, messageSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	chatId: string
	message?: IMessage
	setOpenEdit?: (bool: boolean) => void
}

export const CreateMessageForm = ({ chatId, message, setOpenEdit }: Props) => {
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState('')
	const form = useForm<MessageSchema>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			text: message?.text || '',
			image: message?.image || null
		}
	})
	const { uploadMutation } = useUploads()
	const { mutate: upload, isPending } = uploadMutation()

	const onSubmit = async (values: MessageSchema) => {
		if (values.text.length === 0) return
		const socket = getSocket()

		if (message) {
			socket.emit('edit-message', {
				...values,
				chatId,
				messageId: message.id,
				image: imageUrl
			})
		} else {
			socket.emit('send-message', { ...values, chatId, image: imageUrl })
		}
		form.reset()
		setOpenEdit?.(false)
		setImageUrl('')
	}

	useEffect(() => {
		const formData = new FormData()
		if (image) {
			formData.append('file', image)
		}

		upload(formData, {
			onSuccess: data => {
				setImageUrl(data)
				setImage(null)
			}
		})
	}, [image])

	return (
		<Form {...form}>
			{imageUrl && (
				<Image
					src={imageUrl}
					alt='added image'
					width={80}
					height={80}
					className='ml-4 rounded-2xl'
				/>
			)}
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mx-4 mt-2 flex items-center rounded-md border'
			>
				<FormInput
					className='w-full border-none'
					form={form}
					name='text'
					placeholder='Написать...'
					isShowErrorMessage={false}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='image'
					render={({ field }) => (
						<label className='text-main cursor-pointer pr-2'>
							<input
								onChange={e => {
									const file = e.target.files?.[0]
									if (file) {
										setImage(file)
									}
								}}
								accept='image/*'
								name={field.name}
								ref={field.ref}
								hidden
								type='file'
							/>

							<Paperclip />
						</label>
					)}
				/>

				<Button type='submit' className='rounded-l-none' size={'icon'}>
					<Send />
				</Button>
			</form>
		</Form>
	)
}

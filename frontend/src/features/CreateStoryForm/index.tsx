'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useStories, useUploads, useUser } from '@/api/hooks'
import { Button, Form, FormField, Textarea } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { StorySchema, storySchema } from '@/shared/schemas'

interface Props {
	setOpen: (bool: boolean) => void
}

export const CreateStoryForm = ({ setOpen }: Props) => {
	const { user } = useUser()
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState('')
	const router = useRouter()
	const queryClient = useQueryClient()
	const form = useForm<StorySchema>({
		resolver: zodResolver(storySchema),
		defaultValues: {
			text: '',
			image: ''
		}
	})

	const { createStoryMutation } = useStories()
	const { mutate, isPending } = createStoryMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['stories'] })
		},
		onError: error => showErrorMessage(error)
	})
	const { uploadMutation } = useUploads()
	const { mutate: upload } = uploadMutation()

	const onSubmit = async (values: StorySchema) => {
		if (!user?.userSubscription) return router.push('/premium')
		mutate({ ...values, image: imageUrl })
		setOpen(false)
	}

	useEffect(() => {
		const formData = new FormData()

		if (image) {
			formData.append('file', image)
		}

		upload(formData, {
			onSuccess: data => {
				setImageUrl(data)
			}
		})
	}, [image])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				{imageUrl && (
					<div className='relative h-[150px] w-[150px]'>
						<Image
							src={imageUrl}
							alt='Изображение'
							fill
							className='rounded-2xl object-cover'
						/>
					</div>
				)}
				<FormField
					disabled={isPending}
					control={form.control}
					name='image'
					render={({ field }) => (
						<label className='flex cursor-pointer flex-col items-center justify-center border-2 border-dashed py-10'>
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

							<Upload />
							<p>Загрузить изображение</p>
						</label>
					)}
				/>
				<FormField
					disabled={isPending}
					control={form.control}
					name='text'
					render={({ field }) => (
						<Textarea placeholder='Что нового...' {...field} />
					)}
				/>
				<Button disabled={isPending}>Опубликовать</Button>
			</form>
		</Form>
	)
}

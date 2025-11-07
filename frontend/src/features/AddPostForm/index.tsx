'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { UploadPostImages } from './components'
import { usePosts, useUploads, useUser } from '@/api/hooks'
import { IPost } from '@/api/types'
import {
	Block,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Textarea
} from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { PostSchema, postSchema } from '@/shared/schemas'

interface Props {
	post?: IPost | null
	onSuccess?: () => void
}

export const AddPostForm = ({ post = null, onSuccess }: Props) => {
	const [images, setImages] = useState<File[]>([])
	const [imagesUrls, setImagesUrls] = useState<string[]>(post?.images || [])
	const { user } = useUser()
	const { uploadMutation } = useUploads()
	const queryClient = useQueryClient()
	const { createPostMutation, editPostMutation } = usePosts()

	const form = useForm<PostSchema>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			text: post ? post.text : '',
			images: post ? post.images : []
		}
	})

	const { mutate: upload } = uploadMutation(true)

	useEffect(() => {
		const formData = new FormData()
		for (const file of images) {
			formData.append('files', file)
		}
		upload(formData, {
			onSuccess: data => {
				setImagesUrls(data)
			}
		})
	}, [images])

	const getMutationHandlers = (
		successMessage: string,
		onSuccess?: () => void
	) => ({
		onSuccess: () => {
			form.reset({ text: '' })
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			toast.success(successMessage)
			onSuccess?.()
		},
		onError: (error: unknown) => showErrorMessage(error)
	})

	const { mutate: create, isPending: isCreatePending } = createPostMutation(
		getMutationHandlers('Успешное создание поста!')
	)

	const { mutate: edit, isPending: isEditPending } = editPostMutation(
		post?.id!,
		getMutationHandlers('Пост успешно изменён!', onSuccess)
	)

	const onSubmit = (values: PostSchema) => {
		const hashtags = values.text
			.split(' ')
			.filter(word => word.includes('#'))
		const text = values.text
			.split(' ')
			.filter(word => !word.includes('#'))
			.join(' ')

		return post
			? edit({
					text,
					images: [...post.images, ...imagesUrls],
					hashtags
				})
			: create({ text, images: imagesUrls, hashtags })
	}

	return (
		<Block className='mb-6 p-0'>
			{post || imagesUrls.length ? (
				<div className='flex flex-wrap items-stretch gap-2'>
					{[...(post?.images || []), ...imagesUrls].map(image => (
						<Image
							key={image}
							src={image}
							alt='preview'
							width={100}
							height={100}
							className='object-cover'
						/>
					))}
				</div>
			) : (
				''
			)}
			<Form key={'addPostForm'} {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex w-full items-start gap-4 px-6 py-4'>
						{!post && (
							<Image
								src={
									user?.avatar ||
									'/images/icons/no-avatar.svg'
								}
								alt={user?.name || ''}
								className='max-h-[40px] min-h-[40px] max-w-[40px] min-w-[40px] rounded-2xl object-cover'
								width={40}
								height={40}
							/>
						)}
						<FormField
							control={form.control}
							name='text'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormControl>
										<Textarea
											disabled={
												isCreatePending || isEditPending
											}
											{...field}
											placeholder='Рассказать что-то...'
											className='h-full w-full resize-none border-none shadow-none disabled:pointer-events-none disabled:opacity-50'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex items-center justify-between bg-[#ecf9ff] pl-6'>
						<UploadPostImages setImages={setImages} />
						<button
							type='button'
							className='flex items-center gap-1.5'
						>
							<Image
								width={24}
								height={24}
								alt='Видео'
								src={'/images/icons/videoIcon.svg'}
							/>
							<span className='hidden lg:inline'>Видео</span>
						</button>
						<button
							type='button'
							className='flex items-center gap-1.5'
						>
							<Image
								width={24}
								height={24}
								alt='Событие'
								src={'/images/icons/eventIcon.svg'}
							/>
							<span className='hidden lg:inline'>Событие</span>
						</button>
						<button
							disabled={isCreatePending || isEditPending}
							className='flex h-full w-full max-w-[70px] items-center justify-center bg-[#c7edff] p-6 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50'
						>
							<Send size={24} color='var(--color-text)' />
						</button>
					</div>
				</form>
			</Form>
		</Block>
	)
}

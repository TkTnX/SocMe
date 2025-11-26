'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AddPostControls, UploadPostImages } from './components'
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

// TODO: Сократить количество кода

interface Props {
	post?: IPost | null
	onSuccess?: () => void
	groupId?: string
}

export const AddPostForm = ({ post = null, onSuccess, groupId }: Props) => {
	const [images, setImages] = useState<File[]>([])
	const [videoUrl, setVideoUrl] = useState<string>('')
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
			queryClient.invalidateQueries({ queryKey: ['group', groupId] })
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
					hashtags,
					video: videoUrl
				})
			: create({
					text,
					images: imagesUrls,
					hashtags,
					groupId,
					video: videoUrl
				})
	}

	return (
		<Block className='mb-6 p-0'>
			{post || imagesUrls.length ? (
				<div className='flex flex-wrap items-stretch gap-2'>
					{[...(post?.images || []), ...imagesUrls].map(
						(image, index) => (
							<Image
								key={index}
								src={image}
								alt='preview'
								width={100}
								height={100}
								className='object-cover'
							/>
						)
					)}
				</div>
			) : (
				''
			)}
			{(post || videoUrl) && <video src={post?.video || videoUrl} controls />}
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
					<AddPostControls
						setVideoUrl={setVideoUrl}
						isPending={isCreatePending || isEditPending}
						setImages={setImages}
					/>
				</form>
			</Form>
		</Block>
	)
}

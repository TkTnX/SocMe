'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { AddPostControls } from './components'
import { usePosts, useUploads, useUser } from '@/api/hooks'
import { IPost } from '@/api/types'
import {
	Block,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	ImagesPreview,
	Textarea
} from '@/shared/components'
import { extractHashtags } from '@/shared/helpers'
import { PostSchema, postSchema } from '@/shared/schemas'

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
	const { uploadImages } = useUploads()
	const queryClient = useQueryClient()
	const { createPostMutation, editPostMutation } = usePosts()

	const form = useForm<PostSchema>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			text: post ? post.text : '',
			images: post ? post.images : []
		}
	})

	const handlers = (msg: string, cb?: () => void) => ({
		onSuccess: () => {
			form.reset({ text: '' })
			queryClient.invalidateQueries()
			toast.success(msg)
			cb?.()
		}
	})

	const { mutate, isPending } = post
		? editPostMutation(post.id, handlers('Пост изменён!', onSuccess))
		: createPostMutation(handlers('Пост создан!'))

	useEffect(() => {
		if (images.length) uploadImages(images, setImagesUrls)
	}, [images])

	const onSubmit = (values: PostSchema) => {
		const { hashtags, cleanText } = extractHashtags(values.text)
		const payload = post
			? {
					text: cleanText,
					images: [...post.images, ...imagesUrls],
					hashtags,
					video: videoUrl
				}
			: {
					text: cleanText,
					images: imagesUrls,
					hashtags,
					video: videoUrl,
					groupId
				}

		mutate(payload)
	}

	return (
		<Block className='mb-6 p-0'>
			<ImagesPreview post={post} imagesUrls={imagesUrls} />
			{(post || videoUrl) && (
				<video src={post?.video || videoUrl} controls />
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
											disabled={isPending}
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
						isPending={isPending}
						setImages={setImages}
					/>
				</form>
			</Form>
		</Block>
	)
}

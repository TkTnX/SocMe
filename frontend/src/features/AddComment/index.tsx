'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Send, X } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { useComments, useUser } from '@/api/hooks'
import { IComment } from '@/api/types'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	Input
} from '@/shared/components'
import { CommentSchema, commentSchema } from '@/shared/schemas'

interface Props {
	postId: string
	comment?: IComment
	onClose?: () => void
}

export const AddComment = ({ postId, comment, onClose }: Props) => {
	const { user, isUserPending } = useUser()
	const queryClient = useQueryClient()
	const form = useForm<CommentSchema>({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			image: null,
			text: comment ? comment.text : ''
		}
	})
	const commentsHook = useComments()

	const commentMutation = comment
		? commentsHook.editCommentMutation
		: commentsHook.createCommentMutation

	const { mutate, isPending } = commentMutation(
		comment ? comment.id : postId,
		{
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['post comments', postId]
				})
				onClose?.()
			}
		}
	)

	const onSubmit = (data: CommentSchema) => mutate(data)

	if (isUserPending) return null
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='bg-bg mt-4 flex items-center rounded-2xl px-2'
			>
				{!comment ? (
					<Image
						src={user?.avatar || '/images/icons/no-avatar.svg'}
						width={26}
						height={26}
						className='rounded-full object-cover'
						alt={user?.name || ''}
					/>
				) : (
					<button
						type='button'
						onClick={onClose}
						className='text-main'
					>
						<X size={14} />
					</button>
				)}

				<FormField
					control={form.control}
					name='text'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl className='w-full'>
								<Input
									{...field}
									disabled={isPending}
									placeholder='Написать комментарий...'
									className='py-4'
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<button type='button' className='hover:opacity-80'>
					<Image
						src={'/images/icons/imageIcon.svg'}
						alt='Добавить фото'
						width={16}
						height={16}
					/>
				</button>
				{form.watch('text') ? (
					<button
						disabled={isPending}
						type='submit'
						className='pl-2 disabled:pointer-events-none disabled:opacity-50'
					>
						<Send
							size={18}
							className='hover:stroke-main stroke-1'
						/>
					</button>
				) : (
					''
				)}
			</form>
		</Form>
	)
}

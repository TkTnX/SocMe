'use client'

import { useState } from 'react'

import { IPost } from '@/api/types'
import { AddPostForm } from '@/features/AddPostForm'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button
} from '@/shared/components'

interface Props {
	post: IPost
}

export const EditPost = ({ post }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button className='w-full' variant={'outline'}>
					Редактировать
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className='px-0 pb-0'>
				<AlertDialogTitle className='pl-4'>
					Редактирование поста
				</AlertDialogTitle>

				<AddPostForm onSuccess={() => setOpen(false)} post={post} />
			</AlertDialogContent>
		</AlertDialog>
	)
}

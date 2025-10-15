'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import {
	Block,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Textarea
} from '@/shared/components'
import { PostSchema, postSchema } from '@/shared/schemas'
import { usePosts } from '@/api/hooks'

export const AddPostForm = () => {
	const {createPostMutation} = usePosts()
	const form = useForm<PostSchema>({
		resolver: zodResolver(postSchema)
	})

	const onSubmit = async (values: PostSchema) => {
		const response = await createPostMutation.mutate(values)
		
		console.log(response)
	}

	return (
		<Block className='p-0'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex w-full items-start gap-4 px-6 py-4'>
						<Image
							src={'/images/temp/userPhoto.jpg'}
							alt='User avatar'
							className='rounded-2xl'
							width={40}
							height={40}
						/>
						<FormField
							control={form.control}
							name='text'
							render={({ field }) => (
								<FormItem className='flex-1'>
									<FormControl>
										<Textarea
											{...field}
											placeholder='Рассказать что-то...'
											className='h-full w-full resize-none border-none shadow-none'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex items-center justify-between bg-[#ecf9ff] pl-6'>
						<button className='flex items-center gap-1.5'>
							<Image
								width={24}
								height={24}
								alt='Добавление фото'
								src={'/images/icons/imageIcon.svg'}
							/>
							<span className='hidden lg:inline'>
								Изображения
							</span>
						</button>
						<button className='flex items-center gap-1.5'>
							<Image
								width={24}
								height={24}
								alt='Видео'
								src={'/images/icons/videoIcon.svg'}
							/>
							<span className='hidden lg:inline'>Видео</span>
						</button>
						<button className='flex items-center gap-1.5'>
							<Image
								width={24}
								height={24}
								alt='Событие'
								src={'/images/icons/eventIcon.svg'}
							/>
							<span className='hidden lg:inline'>Событие</span>
						</button>
						<button className='flex h-full w-full max-w-[70px] items-center justify-center bg-[#c7edff] p-6 hover:opacity-80'>
							<Send size={24} color='var(--color-text)' />
						</button>
					</div>
				</form>
			</Form>
		</Block>
	)
}

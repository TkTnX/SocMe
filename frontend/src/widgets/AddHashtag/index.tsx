'use client'

import { useQueryClient } from '@tanstack/react-query'
import { Plus, PlusSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDebounce } from 'use-debounce'

import { useHashtags } from '@/api/hooks'
import { IUser } from '@/api/types'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
	ErrorMessage,
	Input,
	Skeleton
} from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { cn } from '@/shared/lib'
import { ErrorType } from '@/shared/types'

interface Props {
	user: IUser | null
}

export const AddHashtag = ({ user }: Props) => {
	const queryClient = useQueryClient()
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [value] = useDebounce(query, 1000)
	const { getHashtagsQuery, addHashtagToFavoritesMutation } = useHashtags()
	const { data, error, isPending } = getHashtagsQuery(value)
	const { mutate } = addHashtagToFavoritesMutation({
		onSuccess: () => {
			toast.success('Хэштег добавлен в избранное')
			queryClient.invalidateQueries({ queryKey: ['user'] })
		},
		onError: error => showErrorMessage(error)
	})

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<button className='hover:opacity-80'>
					<PlusSquareIcon color='var(--color-text)' />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle className='pl-4'>
					Добавление хэштегов
				</AlertDialogTitle>

				<Input
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='Поиск тега'
					className='border'
				/>

				{error ? (
					<ErrorMessage error={error as ErrorType} />
				) : (
					<div className='flex flex-wrap gap-3'>
						{isPending
							? [...new Array(10)].map((_, index) => (
									<Skeleton
										className='h-8 w-20'
										key={index}
									/>
								))
							: data?.map(hashtag => (
									<button
										onClick={() => mutate(hashtag.id)}
										key={hashtag.id}
										className={cn(
											'text-main border-main hover:bg-main w-fit rounded-full border px-2 py-1 text-center transition hover:text-white',
											{
												'bg-main text-white':
													user?.hashtags.find(
														tag =>
															tag.id ===
															hashtag.id
													)
											}
										)}
									>
										{hashtag.name}
									</button>
								))}
					</div>
				)}
			</AlertDialogContent>
		</AlertDialog>
	)
}

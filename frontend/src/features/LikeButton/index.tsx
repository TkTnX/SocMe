'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useLike } from '@/api/hooks'
import { ELikeType, IUser } from '@/api/types'
import { cn } from '@/lib'
import { Badge } from '@/shared/components'

interface Props {
	type: string
	id: string
	user: IUser | null
	totalLikes: number
}
export const LikeButton = ({ id, user, type, totalLikes = 0 }: Props) => {
	const queryClient = useQueryClient()
	const [currLikes, setCurrLikes] = useState(totalLikes)
	const [isLiked, setIsLiked] = useState(false)

	const { likeMutation } = useLike()

	const { mutate, isPending, error } = likeMutation(type, id, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			setIsLiked(!isLiked)

			if (isLiked) {
				setCurrLikes(currLikes + 1)
			} else {
				setCurrLikes(currLikes - 1)
			}
		},
		onError: () => {
			// TODO: Перенести эту функцию в отдельный файл
			const err = error as AxiosError<{
				message: string
				error: string
				statusCode: number
			}>
			toast.error(err?.response?.data.message[0])
		}
	})

	useEffect(() => {
		const like = user?.likes?.find(like => like.likedId === id)
		setIsLiked(!!like)
	}, [user])

	return (
		<button
			disabled={isPending}
			onClick={() => mutate(id)}
			className={cn(
				'relative hover:opacity-80 disabled:pointer-events-none disabled:opacity-50'
			)}
		>
			{/* TODO: Badge с кол-вом лайков , как в макете */}
			{totalLikes > 0 && (
				<Badge className='absolute -top-3 -right-4'>
					{totalLikes > 99 ? '+99' : totalLikes}
				</Badge>
			)}
			<Image
				alt='Лайк'
				width={24}
				height={24}
				src={`/images/icons/${isLiked ? 'like-filled' : 'like'}.svg`}
			/>
		</button>
	)
}

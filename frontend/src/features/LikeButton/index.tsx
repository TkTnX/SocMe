'use client'

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useLike } from '@/api/hooks'
import { ELikeType, IUser } from '@/api/types'
import { Badge } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { cn } from '@/shared/lib'

interface Props {
	type: string
	id: string
	user: IUser | null
	totalLikes: number
	size?: number
}
export const LikeButton = ({ size, id, user, type, totalLikes = 0 }: Props) => {
	const queryClient = useQueryClient()
	const [currLikes, setCurrLikes] = useState(totalLikes)
	const [isLiked, setIsLiked] = useState(false)

	const { likeMutation } = useLike()

	const { mutate, isPending } = likeMutation(type, id, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			setIsLiked(!isLiked)

			if (isLiked) {
				setCurrLikes(currLikes + 1)
			} else {
				setCurrLikes(currLikes - 1)
			}
		},
		onError: (error: unknown) => showErrorMessage(error)
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
			{totalLikes > 0 && (
				<Badge
					className={cn('absolute -top-3 -right-4', {
						'-top-2 -right-3 h-[18px] w-[18px] text-xs': size
					})}
				>
					{totalLikes > 99 ? '+99' : totalLikes}
				</Badge>
			)}
			<Image
				className='dark:invert-100'
				alt='Лайк'
				width={size || 24}
				height={size || 24}
				src={`/images/icons/${isLiked ? 'like-filled' : 'like'}.svg`}
			/>
		</button>
	)
}

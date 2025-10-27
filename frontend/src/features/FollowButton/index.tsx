'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { useFollow, useUser } from '@/api/hooks'
import { IUser } from '@/api/types'
import { Button, type ButtonVariants } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'

interface Props {
	variant?: ButtonVariants
	profile: IUser | null
}

export const FollowButton = ({ variant, profile }: Props) => {
	const { user } = useUser()
	const [isUserFollower, setIsUserFollower] = useState(false)
	const [isFollowing, setIsFollowing] = useState(false)
	const { followMutation } = useFollow()
	const queryClient = useQueryClient()
	const { mutate, isPending } = followMutation(profile?.id || '', {
		onError: (error: unknown) => showErrorMessage(error),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user by id', profile?.id]
			})
		}
	})

	useEffect(() => {
		const isUserFollower = profile?.followers.find(
			follower => follower.followerId === user?.id
		)
		const isProfileFollowingUser = profile?.followings.find(
			following => following.followingToId === user?.id
		)
		setIsUserFollower(!!isUserFollower)
		setIsFollowing(!!isProfileFollowingUser)
	}, [user, profile])

	const buttonText =
		isUserFollower && !isFollowing
			? 'Отписаться'
			: !isUserFollower && isFollowing
				? 'Добавить в друзья'
				: isUserFollower && isFollowing
					? 'В друзьях'
					: 'Подписаться'

	return (
		<Button
			disabled={isPending}
			onClick={() => mutate(profile?.id)}
			className='flex-1'
			variant={isUserFollower ? 'outline' : variant ? variant : 'default'}
		>
			{buttonText}
		</Button>
	)
}

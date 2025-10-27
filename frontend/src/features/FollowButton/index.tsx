'use client'

import { useQueryClient } from '@tanstack/react-query'

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

	const isUserFollower = profile?.followers.find(
		follower => follower.followerId === user?.id
	)
	const isProfileFollowingUser = profile?.followings.find(
		following => following.followingToId === user?.id
	)

	const buttonText =
		isUserFollower && !isProfileFollowingUser
			? 'Отписаться'
			: !isUserFollower && isProfileFollowingUser
				? 'Добавить в друзья'
				: isUserFollower && isProfileFollowingUser
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

import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { useFollow } from '@/api/hooks'
import { IFollower } from '@/api/types'
import { Button, type ButtonVariants } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'

interface Props {
	followings?: IFollower[]
	followers?: IFollower[]
	profileId: string
	variant?: ButtonVariants
}

export const FollowButton = ({
	followers,
	profileId,
	variant,
	followings
}: Props) => {
	const { followMutation } = useFollow()
	const queryClient = useQueryClient()
	const { mutate, isPending } = followMutation(profileId, {
		onError: (error: unknown) => showErrorMessage(error),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user by id', profileId]
			})
		}
	})
	const isFollowing = followers?.find(following => {
		return following.followingToId === profileId
	})

	const isFollowed = followings?.find(
		follower => follower.followerId === profileId
	)

	const buttonText =
		isFollowing && !isFollowed
			? 'Отписаться'
			: isFollowed && !isFollowing
				? 'Добавить в друзья'
				: isFollowed && isFollowing
					? 'В друзьях'
					: 'Подписаться'

	return (
		<Button
			disabled={isPending}
			onClick={() => mutate(profileId)}
			className='flex-1'
			variant={isFollowing ? 'outline' : variant ? variant : 'default'}
		>
			{buttonText}
		</Button>
	)
}

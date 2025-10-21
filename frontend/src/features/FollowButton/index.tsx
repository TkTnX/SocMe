import { useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { useFollow } from '@/api/hooks'
import { IFollower } from '@/api/types'
import { Button } from '@/shared/components'

interface Props {
	followings?: IFollower[]
	followers?: IFollower[]
	profileId: string
	isUserFollowed?: IFollower
}

export const FollowButton = ({
	followings,
	followers,
	profileId,
	isUserFollowed
}: Props) => {
	const { followMutation } = useFollow()
	const queryClient = useQueryClient()
	const { mutate, isPending } = followMutation(profileId, {
		onError: (error: unknown) => {
			// TODO: Перенести эту функцию в отдельный файл
			const err = error as AxiosError<{
				message: string
				error: string
				statusCode: number
			}>
			toast.error(err?.response?.data.message[0])
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['user by id', profileId]
			})
		}
	})
	const isFollowed = followers?.find(following => {
		console.log(following)

		return following.followingToId === profileId
	})

	const buttonText =
		isFollowed && !isUserFollowed
			? 'Отписаться'
			: isUserFollowed && !isFollowed
				? 'Добавить в друзья'
				: isUserFollowed && isFollowed
					? 'В друзьях'
					: 'Подписаться'

	return (
		<Button
			disabled={isPending}
			onClick={() => mutate(profileId)}
			className='flex-1'
			variant={isFollowed ? 'outline' : 'default'}
		>
			{buttonText}
		</Button>
	)
}

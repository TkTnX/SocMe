import { IUser } from '@/api/types'
import { Skeleton } from '@/shared/components'
import { getDeclensions } from '@/shared/helpers'

interface Props {
	isUserPending: boolean
	user: IUser | null
}

export const ProfileNumbers = ({ isUserPending, user }: Props) => {
	return (
		<div className='mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-10'>
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.posts.length
					)}
				</span>{' '}
				{getDeclensions(
					['Пост', 'Поста', 'Постов'],
					user?.posts.length || 0
				)}
			</div>
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.followers.length
					)}
				</span>{' '}
				{getDeclensions(
					['Подписчик', 'Подписчика', 'Подписчиков'],
					user?.followers.length || 0
				)}
			</div>
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.followings.length
					)}
				</span>{' '}
				{getDeclensions(
					['Подписка', 'Подписки', 'Подписок'],
					user?.followings.length || 0
				)}
			</div>
		</div>
	)
}

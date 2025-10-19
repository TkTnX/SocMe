import { IUser } from '@/api/types'
import { Skeleton } from '@/shared/components'

interface Props {
	isUserPending: boolean
	user: IUser | null
}

export const ProfileNumbers = ({ isUserPending, user }: Props) => {
	return (
		<div className='mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-10'>
			{/* TODO: Добавить склонения */}
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.posts.length
					)}
				</span>{' '}
				Постов
			</div>
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.followers.length
					)}
				</span>{' '}
				Подписчиков
			</div>
			<div className='flex items-center gap-1'>
				<span className='text-sm font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[20px]' />
					) : (
						user?.followings.length
					)}
				</span>{' '}
				Подписок
			</div>
		</div>
	)
}

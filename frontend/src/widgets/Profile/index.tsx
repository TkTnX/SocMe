'use client'

import { Briefcase, Link } from 'lucide-react'
import Image from 'next/image'

import { ProfileControls, ProfileNumbers } from './components'
import { useUser } from '@/api/hooks'
import { PremiumIcon, Skeleton } from '@/shared/components'
import { PostsList } from '@/widgets/PostsList'

interface Props {
	userId: string
}

export const Profile = ({ userId }: Props) => {
	const { getUserByIdQuery } = useUser(userId)
	const {
		data: user,
		error: userError,
		isPending: isUserPending
	} = getUserByIdQuery(userId)

	// TODO: Вывод компонента ошибки
	if (userError)
		return (
			<p className='text-center text-3xl text-red-500'>
				Ошибка при получении пользователя
			</p>
		)

	return (
		<div className='flex-1'>
			<div
				className={`relative flex w-full flex-col items-center justify-center`}
			>
				{isUserPending ? (
					<Skeleton className='h-[200px] w-full' />
				) : user?.cover ? (
					<div className='relative h-[200px] w-full rounded-t-2xl'>
						<Image
							alt={user.name}
							fill
							src={user?.cover}
							className='rounded-t-2xl'
						/>
					</div>
				) : (
					<div className='h-[200px] w-full bg-gray-400' />
				)}
				<div className='absolute -bottom-15 left-1/2 mt-20 h-[150px] w-[150px] -translate-x-1/2 overflow-hidden rounded-full border-2 bg-white'>
					{isUserPending ? (
						<Skeleton className='h-full w-full' />
					) : (
						<Image
							fill
							alt={user?.name!}
							className='object-cover'
							src={user?.avatar || '/images/icons/no-avatar.svg'}
						/>
					)}
				</div>
			</div>
			<div className='rounded-b-2xl bg-white px-4 pt-16 pb-4'>
				<h3 className='flex items-center justify-center gap-1 text-center text-2xl font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[50px]' />
					) : (
						user?.name
					)}{' '}
					<PremiumIcon isPremium={true} />
				</h3>
				<div className='text-main mt-1 flex items-center justify-center gap-1 text-center text-xs font-bold'>
					<Briefcase size={12} />
					{isUserPending ? (
						<Skeleton className='h-[10px] w-[70px]' />
					) : (
						user?.hobby
					)}
				</div>

				{/* Кол-во постов, подписчиков и подписок */}
				<ProfileNumbers isUserPending={isUserPending} user={user!} />

				{isUserPending ? (
					<Skeleton className='mt-4 h-[200px] w-full' />
				) : (
					<p className='mt-4 text-center text-xs'>{user?.bio}</p>
				)}
				{user?.websites && (
					<div className='mt-2 flex items-center justify-center gap-2'>
						{user?.websites.map((webiste, index) => (
							<a
								key={index}
								className='bg-main/30 text-main flex items-center gap-1 rounded-lg p-1 text-xs hover:opacity-80'
								href={webiste}
							>
								<Link size={12} />
								{webiste.split('://')[1]}
							</a>
						))}
					</div>
				)}
				<ProfileControls user={user!} />
			</div>
			{!isUserPending && <PostsList userPosts={user?.posts} />}
		</div>
	)
}

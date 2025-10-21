'use client'

import { AxiosError } from 'axios'
import { Briefcase, Link } from 'lucide-react'
import Image from 'next/image'

import { ProfileControls, ProfileNumbers } from './components'
import { useUser } from '@/api/hooks'
import {
	Button,
	ErrorMessage,
	PremiumIcon,
	Skeleton
} from '@/shared/components'
import { PostsList } from '@/widgets/PostsList'
import { ErrorType } from '@/shared/types'

interface Props {
	userId: string
}

export const Profile = ({ userId }: Props) => {
	const { getUserByIdQuery, user } = useUser()
	const {
		data: profile,
		error: userError,
		isPending: isUserPending
	} = getUserByIdQuery(userId)

	if (userError) return <ErrorMessage error={userError as ErrorType} />

	return (
		<div className='flex-1'>
			<div
				className={`relative flex w-full flex-col items-center justify-center`}
			>
				{isUserPending ? (
					<Skeleton className='h-[200px] w-full' />
				) : profile?.cover ? (
					<div className='relative h-[200px] w-full rounded-t-2xl'>
						<Image
							alt={profile.name}
							fill
							src={profile?.cover}
							className='rounded-t-2xl object-cover'
						/>
					</div>
				) : (
					<div className='h-[200px] w-full rounded-t-2xl bg-gray-400' />
				)}
				<div className='absolute -bottom-15 left-1/2 mt-20 h-[150px] w-[150px] -translate-x-1/2 overflow-hidden rounded-full border-2 bg-white'>
					{isUserPending ? (
						<Skeleton className='h-full w-full' />
					) : (
						<Image
							fill
							alt={profile?.name!}
							className='object-cover'
							src={
								profile?.avatar || '/images/icons/no-avatar.svg'
							}
						/>
					)}
				</div>
			</div>
			<div className='rounded-b-2xl bg-white px-4 pt-16 pb-4'>
				<h3 className='flex items-center justify-center gap-1 text-center text-2xl font-bold text-black'>
					{isUserPending ? (
						<Skeleton className='h-[20px] w-[50px]' />
					) : (
						profile?.name
					)}{' '}
					<PremiumIcon isPremium={true} />
				</h3>
				{profile?.hobby && (
					<div className='text-main mt-1 flex items-center justify-center gap-1 text-center text-xs font-bold'>
						<Briefcase size={12} />
						{isUserPending ? (
							<Skeleton className='h-[10px] w-[70px]' />
						) : (
							profile?.hobby
						)}
					</div>
				)}

				{/* Кол-во постов, подписчиков и подписок */}
				<ProfileNumbers isUserPending={isUserPending} user={profile!} />

				{isUserPending ? (
					<Skeleton className='mt-4 h-[200px] w-full' />
				) : (
					<p className='mt-4 text-center text-xs'>{profile?.bio}</p>
				)}
				{profile?.websites && (
					<div className='mt-2 flex items-center justify-center gap-2'>
						{profile?.websites.map((webiste, index) => (
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
				{user?.id === profile?.id ? (
					<Button className='mt-4 w-full flex-1'>
						Редактировать профиль
					</Button>
				) : (
					<ProfileControls user={profile!} profileId={profile?.id!} />
				)}
			</div>
			{!isUserPending && <PostsList userPosts={profile?.posts} />}
		</div>
	)
}

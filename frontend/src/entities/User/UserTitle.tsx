import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { IUser } from '@/api/types'
import { Skeleton } from '@/shared/components'

// TODO: TEMP
const isPremium = true

interface Props {
	userImageClassName?: string
	user: IUser
	isUserPending?: boolean
}

export const UserTitle = ({
	userImageClassName,
	user,
	isUserPending
}: Props) => {
	return (
		<div className='flex items-start gap-2'>
			{' '}
			<Link href={`/profile/${user.id}`}>
				<Image
					className={cn(
						'relative rounded-2xl bg-white',
						userImageClassName
					)}
					src={user.avatar || '/images/icons/no-avatar.svg'}
					alt={user.name || ''}
					width={44}
					height={44}
				/>
			</Link>
			<div>
				<Link
					href={`/profile/${user.id}`}
					className='flex items-center gap-1 text-sm'
				>
					{user?.name
						? user.name
						: isUserPending && (
								<Skeleton className='h-4 w-full rounded-sm' />
							)}{' '}
					{isPremium && (
						<Image
							src={'/images/icons/premium-icon.svg'}
							width={16}
							height={13}
							alt='Премиум пользователь'
						/>
					)}
				</Link>
				<p className='text-xs text-black/40'>
					{user?.hobby || 'Пользователь'}
				</p>
			</div>
		</div>
	)
}

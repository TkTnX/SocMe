import Image from 'next/image'
import Link from 'next/link'

import { IUser } from '@/api/types'
import { PremiumIcon, Skeleton } from '@/shared/components'
import { cn } from '@/shared/lib/utils'

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
						'relative max-h-[44px] min-h-[44px] max-w-[44px] min-w-[44px] rounded-2xl bg-white object-cover dark:bg-transparent',
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
					<PremiumIcon isPremium={true} />
				</Link>
				<p className='text-xs text-black/40 dark:text-white'>
					{user?.hobby || 'Пользователь'}
				</p>
			</div>
		</div>
	)
}

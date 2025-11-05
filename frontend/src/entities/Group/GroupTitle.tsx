import { PlusSquareIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { IGroup, IGroupFollower } from '@/api/types'
import { PremiumIcon, Skeleton } from '@/shared/components'
import { SUBSCIPTION_DECLENSIONS } from '@/shared/constants'
import { getDeclensions } from '@/shared/helpers'
import { cn } from '@/shared/lib/utils'

interface Props {
	groupImageClassName?: string
	group: IGroup | IGroupFollower
	isGroupPending?: boolean
	isPopulars?: boolean
}

export const GroupTitle = ({
	groupImageClassName,
	group,
	isGroupPending,
	isPopulars = false
}: Props) => {
	const groupData: IGroup = isGroupFollower(group) ? group.group! : group

	return (
		<div className='relative flex w-full items-start gap-2'>
			<Link
				className='absolute inset-0 z-10'
				href={`/groups/${groupData.id}`}
			/>{' '}
			<div>
				<Image
					className={cn(
						'relative min-h-[44px] min-w-[44px] rounded-2xl bg-white object-cover',
						groupImageClassName
					)}
					src={groupData.avatar || '/images/no-avatar-group.jpg'}
					alt={groupData.name || ''}
					width={44}
					height={44}
				/>
			</div>
			<div>
				<div className='flex items-center gap-1 text-sm'>
					{groupData.name
						? groupData.name
						: isGroupPending && (
								<Skeleton className='h-4 w-full rounded-sm' />
							)}{' '}
				</div>
				{isPopulars ? (
					<p className='text-xs text-black/40'>
						{groupData.followers?.length}{' '}
						{getDeclensions(
							SUBSCIPTION_DECLENSIONS,
							Number(groupData.followers?.length)
						)}
					</p>
				) : (
					<p className='text-xs text-black/40'>{groupData.type}</p>
				)}
			</div>
		</div>
	)
}

function isGroupFollower(
	group: IGroup | IGroupFollower
): group is IGroupFollower {
	return 'groupId' in group
}

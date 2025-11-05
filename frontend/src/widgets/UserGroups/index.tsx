'use client'

import { useState } from 'react'

import { useUser } from '@/api/hooks'
import { GroupTitle } from '@/entities'
import { Block } from '@/shared/components'
import { cn } from '@/shared/lib'

export const UserGroups = () => {
	const [tab, setTab] = useState(0)
	const { user } = useUser()

	return (
		<Block className=''>
			<div className='vsm:flex-row flex flex-col gap-4 md:flex-col lg:flex-row lg:items-center'>
				<button
					className={cn('flex-1 px-2 py-1', {
						'bg-main rounded-lg text-white': tab === 0
					})}
					onClick={() => setTab(0)}
				>
					Все сообщества <span>{user?.followingGroups.length}</span>
				</button>
				<button
					className={cn('flex-1 px-2 py-1', {
						'bg-main rounded-lg text-white': tab === 1
					})}
					onClick={() => setTab(1)}
				>
					Управляемые <span>{user?.groups.length}</span>
				</button>
			</div>
			<div className='mt-4 flex flex-col gap-2'>
				{(tab === 0 ? user?.followingGroups : user?.groups)?.map(
					group => (
						<GroupTitle key={group.id} group={group} />
					)
				)}
			</div>
		</Block>
	)
}

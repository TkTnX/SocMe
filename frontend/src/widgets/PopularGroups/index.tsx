'use client'

import { PlusSquareIcon } from 'lucide-react'

import { useGroups } from '@/api/hooks'
import { GroupTitle } from '@/entities'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const PopularGroups = () => {
	const { getGroupsQuery } = useGroups()
	const { data, isPending, error } = getGroupsQuery({ followers: 'asc' })

	return (
		<Block >
			<h3>Популярное</h3>
			<div className='mt-4 flex flex-col gap-2'>
				{error ? (
					<ErrorMessage error={error as ErrorType} />
				) : isPending ? (
					[...new Array(5)].map((_, index) => (
						<Skeleton key={index} className='h-9 w-full' />
					))
				) : (
					data.map(group => (
						<div
							key={group.id}
							className='flex items-center justify-between'
						>
							<GroupTitle isPopulars={true} group={group} />
							<button className='ml-auto hidden lg:block'>
								<PlusSquareIcon className='text-main' />
							</button>
						</div>
					))
				)}
			</div>
		</Block>
	)
}

'use client'

import { useSearchParams } from 'next/navigation'

import { useGroups } from '@/api/hooks'
import { GroupBlock } from '@/entities'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const GroupsList = () => {
	const { getGroupsQuery } = useGroups()
	const searchParams = useSearchParams()
	const name = searchParams.get('name') || ''

	const { data, error, isPending } = getGroupsQuery({ name })

	return (
		<Block>
			<h2 className='text-main text-2xl font-bold'>Список сообществ</h2>
			<div className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3'>
				{error ? (
					<ErrorMessage error={error as ErrorType} />
				) : isPending ? (
					[...new Array(6)].map((_, index) => (
						<Skeleton key={index} className='h-[200px] w-full' />
					))
				) : (
					data.map(group => (
						<GroupBlock group={group} key={group.id} />
					))
				)}
			</div>
		</Block>
	)
}

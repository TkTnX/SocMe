'use client'

import Link from 'next/link'

import { useUser } from '@/api/hooks'
import { UserTitle } from '@/entities'
import { Block, Button, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const YouMayKnow = () => {
	const { getUsersQuery } = useUser()

	const { data, error, isPending } = getUsersQuery()

	if (error) <ErrorMessage error={error as ErrorType} />

	if (!data?.length && !isPending) return null

	return (
		<Block className='px-3'>
			<h6 className='text-inherit'>Возможно, вам знакомы:</h6>
			<div className='mt-6 flex flex-col gap-6 border-b pb-6'>
				{isPending
					? [...new Array(3)].map((_, index) => (
							<Skeleton key={index} className='h-10 w-full' />
						))
					: data?.map(user => (
							<div
								key={user.id}
								className='flex flex-col justify-between gap-2 lg:flex-row lg:items-center'
							>
								<UserTitle user={user} />
								<Button variant={'outline'} asChild>
									<Link href={`/profile/${user.id}`}>
										Подписаться
									</Link>
								</Button>
							</div>
						))}
			</div>
			<Link
				href={'/people'}
				className='text-main block pt-4 text-center text-sm hover:opacity-80'
			>
				Больше
			</Link>
		</Block>
	)
}

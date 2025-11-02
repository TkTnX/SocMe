'use client'

import { Filter, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useUser } from '@/api/hooks'
import { UserBlock } from '@/entities'
import {
	Block,
	Button,
	ErrorMessage,
	Input,
	PeopleFilterSheet,
	Skeleton
} from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const PeopleList = () => {
	const searchParams = useSearchParams()
	const [query, setQuery] = useState('')
	const [value] = useDebounce(query, 1000)
	const { getUsersQuery } = useUser()
	const { data, error, isPending } = getUsersQuery(true, {
		value,
		...Object.fromEntries(searchParams)
	})
	return (
		<>
				<PeopleFilterSheet />
			<Block className='mt-2 py-2'>
				<label className='flex items-center gap-2'>
					<Search />
					<Input
						onChange={e => setQuery(e.target.value)}
						value={query}
						placeholder='Поиск друзей'
					/>
				</label>
			</Block>
			<Block className='mt-4'>
				{error ? (
					<ErrorMessage error={error as ErrorType} />
				) : (
					<div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
						{isPending ? (
							[...new Array(12)].map((_, index) => (
								<Skeleton
									className='h-[260px] w-full'
									key={index}
								/>
							))
						) : data.length > 0 ? (
							data.map(user => (
								<UserBlock key={user.id} user={user} />
							))
						) : (
							<p className='col-span-3 text-center'>
								Ничего не найдено!
							</p>
						)}
					</div>
				)}
			</Block>
		</>
	)
}

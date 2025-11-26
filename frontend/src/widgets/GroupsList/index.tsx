'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';



import { useGroups } from '@/api/hooks';
import { IGroup } from '@/api/types';
import { GroupBlock } from '@/entities';
import { Block, ErrorMessage, Skeleton } from '@/shared/components';
import { ErrorType } from '@/shared/types';





export const GroupsList = () => {
	const [groupsList, setGroupsList] = useState<IGroup[]>([])
	const [page, setPage] = useState(0)
	const { getGroupsQuery } = useGroups()
	const searchParams = useSearchParams()
	const name = searchParams.get('name') || ''

	const { data, error, isPending, refetch } = getGroupsQuery({
		name,
		page: String(page)
	})

	const hasMore = data?.totalPages !== page + 1
	useEffect(() => {
		if (!data) return
		if (page === 0) {
			setGroupsList(data.groups)
		} else {
			setGroupsList([...groupsList, ...data.groups])
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [page])

	useEffect(() => {
		setPage(0)
		if (data?.groups) {
			setGroupsList(data.groups)
		}
	}, [name])

	console.log(data)

	return (
		<Block>
			<h2 className='text-main text-2xl font-bold'>Список сообществ</h2>
			<InfiniteScroll
				next={() => setPage(prev => prev + 1)}
				hasMore={hasMore}
				loader={<p>Загрузка...</p>}
				endMessage={<p>Вы дошли до конца!</p>}
				dataLength={data?.groups.length || 0}
				className='mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3'
			>
				{error ? (
					<ErrorMessage error={error as ErrorType} />
				) : isPending ? (
					[...new Array(6)].map((_, index) => (
						<Skeleton key={index} className='h-[200px] w-full' />
					))
				) : groupsList.length > 0 ? (
					groupsList.map(group => (
						<GroupBlock group={group} key={group.id} />
					))
				) : (
					<p>Ничего не найдено!</p>
				)}
			</InfiniteScroll>
		</Block>
	)
}
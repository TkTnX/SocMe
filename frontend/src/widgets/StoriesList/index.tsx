'use client'

import { Plus } from 'lucide-react'

import { useStories } from '@/api/hooks'
import { StoryRound } from '@/entities'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const StoriesList = () => {
	const { getStoriesQuery } = useStories()

	const { data, isPending, error } = getStoriesQuery()

	if (error) return <ErrorMessage error={error as ErrorType} />
	return (
		// TODO: Сделать компонент carousel
		<div className='mb-4 flex items-center gap-2'>
			<button className='bg-main relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full'>
				<Plus className='text-white' />
			</button>
			{isPending
				? [...new Array(5)].map((_, index) => (
						<Skeleton
							className='h-[50px] w-[50px] rounded-full'
							key={index}
						/>
					))
				: data.map(story => (
						<StoryRound key={story.id} story={story} />
					))}
		</div>
	)
}

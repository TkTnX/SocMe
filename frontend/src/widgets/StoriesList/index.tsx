'use client'

import { Plus } from 'lucide-react'

import { useStories } from '@/api/hooks'
import { StoryModal, StoryRound } from '@/entities'
import { CreateStoryModal, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const StoriesList = () => {
	const { getStoriesQuery } = useStories()

	const { data, isPending, error } = getStoriesQuery()

	if (error) return <ErrorMessage error={error as ErrorType} />
	return (
		<div className='mb-4 flex items-center gap-2'>
			<CreateStoryModal>
				<button className='bg-main relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full'>
					<Plus className='text-white' />
				</button>
			</CreateStoryModal>
			{isPending
				? [...new Array(5)].map((_, index) => (
						<Skeleton
							className='h-[50px] w-[50px] rounded-full'
							key={index}
						/>
					))
				: data.map(story => (
						<StoryModal key={story.id} story={story}>
							<StoryRound story={story} />
						</StoryModal>
					))}
		</div>
	)
}

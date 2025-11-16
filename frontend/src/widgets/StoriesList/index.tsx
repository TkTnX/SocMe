'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { useStories } from '@/api/hooks'
import { IStory } from '@/api/types'
import { StoryModal, StoryRound } from '@/entities'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CreateStoryModal,
	ErrorMessage,
	Skeleton
} from '@/shared/components'
import { ErrorType } from '@/shared/types'

export const StoriesList = () => {
	const [showedStories, setShowedStories] = useState<IStory[]>([])
	const { getStoriesQuery } = useStories()

	const { data, isPending, error } = getStoriesQuery()

	if (error) return <ErrorMessage error={error as ErrorType} />
	console.log(data)

	for (let i = 0; i < data?.length!; i++) {
		if (!data) return null
		if (!showedStories.find(story => story.userId === data[i].userId)) {
			setShowedStories([...showedStories, data[i]])
		}
	}

	return (
		<Carousel>
			<CarouselContent className='mb-4 flex max-w-[500px] items-center gap-2 py-1'>
				<CarouselItem className='basis-[calc(1/10*100%)]'>
					<CreateStoryModal>
						<button className='bg-main relative flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full'>
							<Plus className='text-white' />
						</button>
					</CreateStoryModal>
				</CarouselItem>
				{isPending
					? [...new Array(5)].map((_, index) => (
							<CarouselItem
								className='basis-[calc(1/10*100%)]'
								key={index}
							>
								<Skeleton className='h-[50px] w-[50px] rounded-full' />
							</CarouselItem>
						))
					: showedStories.map(story => (
							<CarouselItem
								key={story.id}
								className='basis-[calc(1/10*100%)]'
							>
								<StoryModal stories={data}>
									<StoryRound story={story} />
								</StoryModal>
							</CarouselItem>
						))}
			</CarouselContent>
		</Carousel>
	)
}

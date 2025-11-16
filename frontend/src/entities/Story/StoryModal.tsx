'use client'

import { Trash } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { useUser } from '@/api/hooks'
import { IStory } from '@/api/types'
import { UserTitle } from '@/entities/User'
import { DeleteStoryButton } from '@/features'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/shared/components'
import { cn } from '@/shared/lib'

interface Props {
	children: React.ReactNode
	stories: IStory[]
}


export const StoryModal = ({ children, stories }: Props) => {
	const [showStoryIndex, setShowStoryIndex] = useState(0)
	const { user } = useUser()
	const isUserStory = user?.id === stories[showStoryIndex]?.userId

	const onStoryChange = (type: 'next' | 'prev') => {
		if (
			showStoryIndex === stories.length - 1 ||
			(type === 'prev' && showStoryIndex === 0)
		) {
			setShowStoryIndex(0)
		} else if (type === 'next') {
			setShowStoryIndex(showStoryIndex + 1)
		} else {
			setShowStoryIndex(showStoryIndex - 1)
		}
	}

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogTitle />
			<DialogContent className='overflow-hidden p-0'>
				<div className='absolute top-1 left-0 z-20 flex w-full items-center gap-1'>
					{[...new Array(stories.length)].map((_, index) => (
						<div
							key={index}
							className={cn('h-0.5 w-full flex-1 bg-gray-500', {
								'bg-gray-100': index === showStoryIndex
							})}
						></div>
					))}
				</div>
				{isUserStory && (
					<DeleteStoryButton onClick={() => setShowStoryIndex(0)} storyId={stories[showStoryIndex].id} />
				)}
				<div className='relative h-[calc(100vh-100px)] w-full'>
					<Image
						src={stories[showStoryIndex].image}
						alt={stories[showStoryIndex].text || ''}
						className='object-cover'
						fill
					/>
				</div>
				<div className='bg absolute bottom-0 flex w-full flex-col gap-3 py-5 pl-10 backdrop-blur-2xl'>
					{stories[showStoryIndex].text && (
						<p>{stories[showStoryIndex].text}</p>
					)}
					<UserTitle user={stories[showStoryIndex].user!} />
				</div>
				<button
					className='absolute top-0 left-0 h-full w-[200px]'
					onClick={() => onStoryChange('prev')}
				></button>
				<button
					className='absolute top-0 right-0 h-full w-[200px]'
					onClick={() => onStoryChange('next')}
				></button>
			</DialogContent>
		</Dialog>
	)
}

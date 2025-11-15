'use client'

import Image from 'next/image'

import { IStory } from '@/api/types'
import { UserTitle } from '@/entities/User'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/shared/components'

interface Props {
	children: React.ReactNode
	story: IStory
}

// TODO: Открытие полной истории
// TODO :Создание историй
// TODO: Удаление историй
// TODO: Carousel Для списка историй

export const StoryModal = ({ children, story }: Props) => {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogTitle />
			<DialogContent className='overflow-hidden p-0'>
				<div className='relative h-[calc(100vh-100px)] w-full'>
					<Image
						src={story.image}
						alt={story.text || ''}
						className='object-cover'
						fill
					/>
				</div>
				<div className='absolute bottom-5 left-10 flex flex-col gap-3'>
					{story.text && <p>{story.text}</p>}
					<UserTitle user={story.user!} />
				</div>
			</DialogContent>
		</Dialog>
	)
}

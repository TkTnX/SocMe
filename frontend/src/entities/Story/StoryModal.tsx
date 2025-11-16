'use client'

import { Trash } from 'lucide-react'
import Image from 'next/image'

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

interface Props {
	children: React.ReactNode
	story: IStory
}

// TODO: Carousel Для списка историй
// TODO: Если у пользователя несколько историй, они должны быть в одной вкладке
// TODO: Блоку с текстом задать какой-то bg color (blur)

export const StoryModal = ({ children, story }: Props) => {
	const { user } = useUser()
	const isUserStory = user?.id === story.userId

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogTitle />
			<DialogContent className='overflow-hidden p-0'>
				{isUserStory && <DeleteStoryButton storyId={story.id} />}
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

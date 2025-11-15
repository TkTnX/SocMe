import Image from 'next/image'

import { IStory } from '@/api/types'

interface Props {
	story: IStory
}

export const StoryRound = ({ story }: Props) => {
	return (
		<div className='ring-main relative h-[50px] w-[50px] cursor-pointer overflow-hidden rounded-full bg-gray-500 ring-1'>
			<Image
				src={story.user?.avatar || '/images/icons/no-avatar.svg'}
				alt={story.text || ''}
				fill
				className='object-cover'
			/>
		</div>
	)
}

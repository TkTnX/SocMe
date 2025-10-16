import { MoreVertical } from 'lucide-react'
import Image from 'next/image'

import { UserTitle } from '../User'

import { IPost } from '@/api/types'
import { PostControls } from '@/entities/Post/components'
import { AddComment } from '@/features'
import { Block } from '@/shared/components'

interface Props {
	post: IPost
}

export const Post = ({ post }: Props) => {
	return (
		<Block className='pt-3.5 pb-2'>
			<div className='flex items-center justify-between'>
				<UserTitle user={post.user} />
				<button>
					<MoreVertical color='var(--color-text)' />
				</button>
			</div>
			<div className='mt-3.5'>
				<h2 className='mt-4 text-sm text-black'>{post.text}</h2>

				{post.image && (
					<div className='relative mt-3.5 aspect-[16/9] max-h-[305px] w-full'>
						{/* TODO: При нажатии открывать */}
						<Image
							className='rounded-2xl object-cover'
							alt={post.text.slice(0, 50)}
							src={post.image}
							fill
						/>
					</div>
				)}
			</div>

			<PostControls />
			<AddComment  />
		</Block>
	)
}

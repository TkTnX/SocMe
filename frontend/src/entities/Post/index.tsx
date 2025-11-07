'use client'

import { MoreVertical } from 'lucide-react'
import { useState } from 'react'

import { UserTitle } from '../User'

import { useUser } from '@/api/hooks'
import { IPost } from '@/api/types'
import { GroupTitle } from '@/entities/Group'
import {
	PostControls,
	PostHashtags,
	PostImages
} from '@/entities/Post/components'
import { AddComment } from '@/features'
import { Block, PostMoreDropdown } from '@/shared/components'
import { cn } from '@/shared/lib'
import { CommentsList } from '@/widgets'

interface Props {
	post: IPost
	className?: string
}

export const Post = ({ post, className }: Props) => {
	const isGroupPost = !!post.groupId
	const { user } = useUser()
	const [openComments, setOpenComments] = useState(false)
	return (
		<Block className={cn('pt-3.5 pb-2', className)}>
			<div className='flex items-center justify-between'>
				{isGroupPost ? (
					<GroupTitle group={post.group!} />
				) : (
					<UserTitle user={post.user} />
				)}

				{user?.id === post.userId && (
					<PostMoreDropdown post={post}>
						<button>
							<MoreVertical color='var(--color-text)' />
						</button>
					</PostMoreDropdown>
				)}
			</div>
			<div className='mt-3.5'>
				<h2 className='mt-4 text-sm text-black'>{post.text}</h2>

				{post.images.length ? <PostImages images={post.images} /> : ''}
			</div>
			{post.hashtags && <PostHashtags hashtags={post.hashtags} />}
			<div className='flex items-center justify-between'>
				<PostControls
					setOpenComments={setOpenComments}
					openComments={openComments}
					totalComments={post.comments.length}
					totalLikes={post.likes.length}
					user={user}
					id={post.id}
				/>
				{isGroupPost && <p className='text-xs'>{post.user.name}</p>}
			</div>
			<AddComment postId={post.id} />
			{openComments && <CommentsList postId={post.id} />}
		</Block>
	)
}

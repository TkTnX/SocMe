import { MoreVertical, Reply } from 'lucide-react'
import { useState } from 'react'

import { useUser } from '@/api/hooks'
import { IComment } from '@/api/types'
import { UserTitle } from '@/entities/User'
import { AddComment } from '@/features'
import { CommentMoreDropdown } from '@/shared/components'
import { cn } from '@/shared/lib'

interface Props {
	comment: IComment
	className?: string
}

export const Comment = ({ comment, className }: Props) => {
	const { user } = useUser()
	const [openEdit, setOpenEdit] = useState(false)
	const [openReply, setOpenReply] = useState(false)
	return (
		<div>
			<div
				className={cn('flex items-center justify-between', className, {
					'mt-3': comment.replyToId
				})}
			>
				<UserTitle userImageClassName='w-8 h-8' user={comment.user!} />
				{user?.id === comment.userId && (
					<CommentMoreDropdown
						setOpenEdit={setOpenEdit}
						comment={comment}
					>
						<button>
							<MoreVertical color='var(--color-text)' />
						</button>
					</CommentMoreDropdown>
				)}
			</div>
			{openEdit ? (
				<AddComment
					onClose={() => setOpenEdit(false)}
					comment={comment}
					postId={comment.postId}
				/>
			) : (
				<>
					<div className='flex items-center justify-between'>
						<p className='pt-2 pl-10'>{comment.text}</p>
						<button
							onClick={() => setOpenReply(!openReply)}
							className='hover:text-main'
						>
							<Reply size={18} />
						</button>
					</div>
					{openReply && (
						<AddComment
							replyToId={comment.id}
							onClose={() => setOpenReply(false)}
							postId={comment.postId}
						/>
					)}
				</>
			)}

			{comment.replies?.length > 0 && (
				<div className='mt-3 border-l border-gray-300 pl-4'>
					{comment.replies.map(reply => (
						<Comment key={reply.id} comment={reply} />
					))}
				</div>
			)}
		</div>
	)
}

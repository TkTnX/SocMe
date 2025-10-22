import { useUser } from '@/api/hooks'
import { IComment } from '@/api/types'
import { UserTitle } from '@/entities/User'
import { AddComment } from '@/features'
import { CommentMoreDropdown } from '@/shared/components'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'

interface Props {
	comment: IComment
}

export const Comment = ({ comment }: Props) => {
  const { user } = useUser()
  const [openEdit, setOpenEdit] = useState(false)
	return (
    <div className=''>
      	<div className='flex items-center justify-between'>
				<UserTitle userImageClassName='w-8 h-8' user={comment.user!} />
				{user?.id === comment.userId && (
					<CommentMoreDropdown setOpenEdit={setOpenEdit} comment={comment}>
						<button>
							<MoreVertical color='var(--color-text)' />
						</button>
					</CommentMoreDropdown>
				)}
			</div>
			{openEdit ? <AddComment onClose={() => setOpenEdit(false)} comment={comment} postId={comment.postId} /> : <p className='pt-2 pl-10'>{comment.text}</p>}
		</div>
	)
}

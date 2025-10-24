'use client'

import { useComments } from '@/api/hooks'
import { Comment } from '@/entities'
import { ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	postId: string
}

export const CommentsList = ({ postId }: Props) => {
	const { getPostCommentsQuery } = useComments()

	const { data, isPending, error } = getPostCommentsQuery(postId)

	if (error) return <ErrorMessage error={error as ErrorType} />

	console.log(data)
	return (
		<div className='mt-4 flex flex-col gap-3 border-t py-4'>
			{isPending ? (
				[...new Array(5)].map((_, index) => (
					<Skeleton key={index} className='h-12 w-full' />
				))
			) : data.length > 0 ? (
				data.map(comment => (
					<div className='border-b pb-4' key={comment.id}>
						<Comment comment={comment} />
					</div>
				))
			) : (
				<p className='text-center'>Список комментариев пуст</p>
			)}
		</div>
	)
}

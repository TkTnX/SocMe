import { useQueryClient } from '@tanstack/react-query'

import { useComments } from '@/api/hooks'
import { Button } from '@/shared/components'

interface Props {
	postId: string
	commentId: string
}

export const DeleteComment = ({ postId, commentId }: Props) => {
	const queryClient = useQueryClient()
	const { deleteCommentMutation } = useComments()

	const { mutate, isPending } = deleteCommentMutation(commentId, {
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['post comments', postId]
			})
		}
	})

	return (
		<Button
			onClick={() => mutate(commentId)}
			disabled={isPending}
			className='w-full'
			variant={'outline'}
		>
			Удалить
		</Button>
	)
}

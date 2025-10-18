import {  useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';



import { usePosts } from '@/api/hooks';
import { Button } from '@/shared/components';





interface Props {
	postId: string
}

export const DeletePost = ({ postId }: Props) => {
	const queryClient = useQueryClient()
	const { deletePostMutation } = usePosts()

	const { mutate, isPending } = deletePostMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] })
			toast.success('Пост удалён')
		}
	})

	return (
		<Button
			onClick={() => mutate(postId)}
			disabled={isPending}
			className='w-full'
			variant={'outline'}
		>
			Удалить
		</Button>
	)
}
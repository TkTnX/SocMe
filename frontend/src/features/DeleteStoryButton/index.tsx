import { useQueryClient } from '@tanstack/react-query'
import { Trash } from 'lucide-react'

import { useStories } from '@/api/hooks'
import { Button } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'

interface Props {
	storyId: string
	onClick: () => void
}

export const DeleteStoryButton = ({ storyId, onClick }: Props) => {
	const { deleteStoryMutation } = useStories()
	const queryClient = useQueryClient()
	const { mutate, isPending } = deleteStoryMutation({
		onSuccess: () => {
			onClick()
			return queryClient.invalidateQueries({ queryKey: ['stories'] })
		},
		onError: error => showErrorMessage(error)
	})
	return (
		<Button
			onClick={() => mutate(storyId)}
			disabled={isPending}
			className='absolute top-5 left-5 z-20'
			size='icon'
		>
			<Trash />
		</Button>
	)
}

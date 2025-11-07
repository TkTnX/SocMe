'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useGroups } from '@/api/hooks'
import { ConfirmationModal } from '@/features'
import { Button } from '@/shared/components'

interface Props {
	groupId: string
}



export const DeleteGroup = ({ groupId }: Props) => {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const { deleteGroupMutation } = useGroups()
	const { mutate, isPending, error } = deleteGroupMutation(groupId, {
		onSuccess: () => router.push('/groups')
	})

	const onDelete = () => mutate()

	return (
		<ConfirmationModal open={open} setOpen={setOpen} onSubmit={onDelete}>
			<Button
				disabled={isPending}
				className='bg-red-500 hover:bg-red-700'
			>
				Удалить сообщество
			</Button>
		</ConfirmationModal>
	)
}

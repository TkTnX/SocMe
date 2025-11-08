import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { useGroups, useUser } from '@/api/hooks'
import { IGroupFollower, IUser } from '@/api/types'
import { UserTitle } from '@/entities'
import {
	Button,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { EditGroupSchema } from '@/shared/schemas'

interface Props {
	admins: IUser[]
	users: IGroupFollower[]
	groupId: string
}

export const GroupAdmins = ({ admins, users, groupId }: Props) => {
	const { user } = useUser()
	const queryClient = useQueryClient()
	const { editGroupMutation } = useGroups()
	const { mutate } = editGroupMutation(groupId, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['group', groupId] })
		},
		onError: err => showErrorMessage(err)
	})
    const adminsIds = admins.flatMap(admin => admin.id)
    
	const onAdd = (userId: string) =>
		mutate({
			admins: [...adminsIds, userId]
		})

	const onDelete = (userId: string) =>
		mutate({
			admins: adminsIds.filter(adminId => adminId !== userId)
		})

	return (
		<div className='flex flex-col gap-4'>
			<h4 className='text-main text-3xl font-bold'>Администрация</h4>
			<Select>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Выберите пользователя' />
				</SelectTrigger>
				<SelectContent>
					{users.map(user => (
						<button
							value={user.user?.id!}
							onClick={() => onAdd(user.user?.id!)}
							key={user.id}
							className='flex w-full items-center justify-between'
						>
							<UserTitle user={user.user!} />{' '}
							<span className='text-xs'>
								#{user.id.slice(0, 10)}
							</span>
						</button>
					))}
				</SelectContent>
			</Select>

			<div className='flex flex-col flex-wrap gap-4'>
				{admins.map(admin => (
					<div
						key={admin.id}
						className='flex items-center justify-between gap-3 border-b pb-3'
					>
						<UserTitle key={admin.id} user={admin} />
						{admin.id !== user?.id && (
							<Button
								type='button'
								onClick={() => onDelete(admin.id)}
								className='bg-red-500 hover:bg-red-700'
							>
								Удалить
							</Button>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

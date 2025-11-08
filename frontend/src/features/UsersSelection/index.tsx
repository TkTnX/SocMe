import { IUser } from '@/api/types'
import { Select, SelectTrigger, SelectValue } from '@/shared/components'

interface Props {
	users: IUser[]
}

export const UsersSelection = ({ users }: Props) => {
	return (
		<Select>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
		</Select>
	)
}

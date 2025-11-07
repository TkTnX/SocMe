import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

import { DeleteGroup } from '@/features'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/components/ui'

interface Props {
	groupId: string
}

export const GroupDropdown = ({ groupId }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button>
					Ещё <ChevronDown />{' '}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-2'>
				<Button asChild>
					<Link href={`/groups/${groupId}/edit`}>Редактировать</Link>
				</Button>
				<DeleteGroup groupId={groupId} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

import { IPost } from '@/api/types'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../ui'

import { DeletePost } from '@/features'
import { EditPost } from '@/widgets'

interface Props {
	children: React.ReactNode
	post: IPost
}

export const PostMoreDropdown = ({ children, post }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-2 p-3'>
				<DropdownMenuItem asChild>
					<EditPost post={post} />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeletePost postId={post.id} />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

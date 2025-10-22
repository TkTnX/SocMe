import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui';



import { IComment } from '@/api/types';
import { DeleteComment } from '@/features';





interface Props {
	children: React.ReactNode
	comment: IComment
	setOpenEdit: (bool: boolean) => void
}

export const CommentMoreDropdown = ({ children, comment, setOpenEdit }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col gap-2 p-3'>
				<DropdownMenuItem asChild>
					<Button onClick={() => setOpenEdit(true)} className='w-full' variant={'outline'}>
						Редактировать
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<DeleteComment
						postId={comment.postId}
						commentId={comment.id}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
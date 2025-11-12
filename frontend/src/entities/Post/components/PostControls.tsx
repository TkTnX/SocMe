import Image from 'next/image'
import { toast } from 'react-toastify'

import { IUser } from '@/api/types'
import { LikeButton } from '@/features'
import { Badge } from '@/shared/components'

interface Props {
	id: string
	user: IUser | null
	totalLikes: number
	setOpenComments: (bool: boolean) => void
	openComments: boolean
	totalComments: number
}

export const PostControls = ({
	id,
	user,
	totalLikes,
	setOpenComments,
	openComments,
	totalComments
}: Props) => {
	const onShare = () => {
		toast.success('URL поста скопирован!')
		return navigator.clipboard.writeText(
			`${process.env.NEXT_PUBLIC_CLIENT_URL}/posts/${id}`
		)
	}

	return (
		<div className='mt-5 flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<LikeButton
					type={'POST'}
					user={user}
					id={id}
					totalLikes={totalLikes}
				/>
				<button
					onClick={() => setOpenComments(!openComments)}
					className='relative hover:opacity-80'
				>
					{totalComments > 0 && (
						<Badge className='absolute -top-3 -right-4'>
							{totalComments > 99 ? '+99' : totalComments}
						</Badge>
					)}
					<Image
						className='dark:invert-100'
						alt='Комментарии'
						width={24}
						height={24}
						src={'/images/icons/comment.svg'}
					/>
				</button>
				<button onClick={onShare} className='hover:opacity-80'>
					<Image
						className='dark:invert-100'
						alt='Поделиться'
						width={24}
						height={24}
						src={'/images/icons/send.svg'}
					/>
				</button>
			</div>
		</div>
	)
}

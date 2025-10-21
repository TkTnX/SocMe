import Image from 'next/image';



import { IUser } from '@/api/types';
import { LikeButton } from '@/features';





interface Props {
	id: string
	user: IUser | null
	totalLikes: number
}

export const PostControls = ({ id, user, totalLikes }: Props) => {
	return (
		<div className='mt-5 flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<LikeButton
					type={'POST'}
					user={user}
					id={id}
					totalLikes={totalLikes}
				/>
				<button className='hover:opacity-80'>
					{/* TODO: Badge с кол-вом комментов , как в макете */}
					<Image
						alt='Комментарии'
						width={24}
						height={24}
						src={'/images/icons/comment.svg'}
					/>
				</button>
				<button className='hover:opacity-80'>
					<Image
						alt='Поделиться'
						width={24}
						height={24}
						src={'/images/icons/send.svg'}
					/>
				</button>
			</div>
			<button className='hover:opacity-80'>
				<Image
					alt='Добавить в избранное'
					width={24}
					height={24}
					src={'/images/icons/favorite.svg'}
				/>
			</button>
		</div>
	)
}
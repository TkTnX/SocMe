import Image from 'next/image'

export const PostControls = () => {
	return (
		<div className='mt-5 flex items-center justify-between'>
			<div className='flex items-center gap-4'>
				<button className='hover:opacity-80'>
					{/* TODO: Badge с кол-вом лайков , как в макете */}
					<Image
						alt='Лайк!'
						width={24}
						height={24}
						src={'/images/icons/like.svg'}
					/>
				</button>
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

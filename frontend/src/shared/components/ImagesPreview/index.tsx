import Image from 'next/image'

import { IPost } from '@/api/types'

interface Props {
	post: IPost | null
	imagesUrls: string[]
}

export const ImagesPreview = ({ post, imagesUrls }: Props) => {
	return post || imagesUrls.length ? (
		<div className='flex flex-wrap items-stretch gap-2'>
			{[...(post?.images || []), ...imagesUrls].map((image, index) => (
				<Image
					key={index}
					src={image}
					alt='preview'
					width={100}
					height={100}
					className='object-cover'
				/>
			))}
		</div>
	) : (
		''
	)
}

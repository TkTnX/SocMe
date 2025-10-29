import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
	Carousel,
	CarouselApi,
	CarouselContent,
	CarouselItem
} from '@/shared/components'
import { cn } from '@/shared/lib'

interface Props {
	images: string[]
}

export const PostImages = ({ images }: Props) => {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)
	useEffect(() => {
		if (!api) {
			return
		}
		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)
		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	return (
		<Carousel setApi={setApi}>
			<CarouselContent>
				{images.map(image => (
					<CarouselItem>
						<div
							key={image}
							className='relative mt-3.5 aspect-[4/5] max-h-[500px] w-full'
						>
							<Image
								className='rounded-2xl object-contain'
								alt={image}
								src={image}
								fill
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			{count > 1 && (
				<div className='mt-4 flex items-center justify-center gap-2 text-sm'>
					{[...new Array(count)].map((_, index) => (
						<div
							key={index}
							className={cn(
								'h-4 w-4 rounded-full border border-gray-400',
								{
									'bg-gray-400': current === index + 1
								}
							)}
						/>
					))}
				</div>
			)}
		</Carousel>
	)
}

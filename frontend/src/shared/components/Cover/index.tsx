import Image from "next/image";



import { Skeleton } from "../ui";



import { cn } from "@/shared/lib";





interface Props {
	isPending: boolean
	coverUrl?: string
	className?: string
}

export const Cover = ({ isPending, coverUrl, className }: Props) => {
	return isPending ? (
		<Skeleton className={cn('h-[200px] w-full', className)} />
	) : coverUrl ? (
		<div
			className={cn('relative h-[200px] w-full rounded-t-2xl', className)}
		>
			<Image
				alt={'Обложка'}
				fill
				src={coverUrl}
				className='rounded-t-2xl object-cover'
			/>
		</div>
	) : (
		<div
			className={cn(
				'h-[200px] w-full rounded-t-2xl bg-gray-400',
				className
			)}
		/>
	)
}
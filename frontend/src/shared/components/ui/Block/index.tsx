import { cn } from '@/shared/lib/utils'

interface Props {
	children: React.ReactNode
	className?: string
}

export const Block = ({ children, className }: Props) => {
	return (
		<div
			className={cn(
				'overflow-hidden rounded-2xl bg-white px-5 py-6 text-black dark:bg-black dark:text-white',
				className
			)}
		>
			{children}
		</div>
	)
}

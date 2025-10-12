import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";





// TODO: TEMP
const isPremium = true

interface Props {
	userImageClassName?: string
	user: any
}

export const UserTitle = ({userImageClassName, user}: Props) => {
	return (
		<div className='flex items-start gap-2'>
			{' '}
			<Image
				className={cn('relative  rounded-2xl', userImageClassName)}
				src={'/images/temp/userPhoto.jpg'}
				alt='user avatar'
				width={44}
				height={44}
			/>
			<div>
				<Link
					href={'/profile'}
					className='flex items-center gap-1 text-sm'
				>
					John Doe{' '}
					{isPremium && (
						<Image
							src={'/images/icons/premium-icon.svg'}
							width={16}
							height={13}
							alt='Премиум пользователь'
						/>
					)}
				</Link>
				<p className='text-xs text-black/40'>UI/UX Designer</p>
			</div>
		</div>
	)
}
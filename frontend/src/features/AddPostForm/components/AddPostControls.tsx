import { UploadPostImages } from '.';
import { Send } from 'lucide-react';
import Image from 'next/image';



import { UploadVideoInput } from '@/shared/components';





interface Props {
	setImages: (images: File[]) => void
	setVideoUrl: (video: string) => void
	isPending: boolean
}

export const AddPostControls = ({ setImages, isPending, setVideoUrl }: Props) => {
	return (
		<div className='flex items-center justify-between bg-[#ecf9ff] pl-6 dark:bg-black/20'>
			<UploadPostImages setImages={setImages} />
			<UploadVideoInput setVideoUrl={setVideoUrl}>
				<p className='flex cursor-pointer items-center gap-2'>
					<Image
						width={24}
						height={24}
						alt='Видео'
						src={'/images/icons/videoIcon.svg'}
					/>
					<span className='hidden lg:inline'>Видео</span>
				</p>
			</UploadVideoInput>
			<button type='button' className='flex items-center gap-1.5'>
				<Image
					width={24}
					height={24}
					alt='Событие'
					src={'/images/icons/eventIcon.svg'}
				/>
				<span className='hidden lg:inline'>Событие</span>
			</button>
			<button
				disabled={isPending}
				className='flex h-full w-full max-w-[70px] items-center justify-center bg-[#c7edff] p-6 hover:opacity-80 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-300'
			>
				<Send size={24} color='var(--color-text)' />
			</button>
		</div>
	)
}
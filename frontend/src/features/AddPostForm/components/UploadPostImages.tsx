import Image from 'next/image'
import { useFormContext } from 'react-hook-form'

import { FormField } from '@/shared/components'
import { PostImagesSchema } from '@/shared/schemas'

interface Props {
	setImages: (images: File[]) => void
}

export const UploadPostImages = ({ setImages }: Props) => {
	const form = useFormContext<PostImagesSchema>()

	const onSubmit = (values: PostImagesSchema) => {
		setImages(values.images)
	}

	return (
		<FormField
			control={form.control}
			name='images'
			render={({ field }) => (
				<label>
					<input
						multiple={true}
						onChange={e => {
							const files = e.target.files
							if (files && files.length > 0) {
								const fileList = Array.from(files)
								field.onChange(fileList)
								onSubmit({ images: fileList })
							}
						}}
						accept='image/*'
						name={field.name}
						ref={field.ref}
						hidden
						type='file'
					/>
					<p className='flex cursor-pointer items-center gap-2'>
						<Image
							width={24}
							height={24}
							alt='Добавление фото'
							src={'/images/icons/imageIcon.svg'}
						/>
						<span className='hidden lg:inline'>Изображения</span>
					</p>
				</label>
			)}
		/>
	)
}

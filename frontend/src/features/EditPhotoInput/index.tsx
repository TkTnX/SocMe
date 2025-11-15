import { UseFormReturn } from 'react-hook-form';



import { FormField } from '@/shared/components';
import { FileImages } from '@/shared/schemas';





interface Props {
	form: UseFormReturn<FileImages>
	children: React.ReactNode
	type?: 'avatar' | 'cover'
	onSubmit: (values: FileImages, type: 'avatar' | 'cover') => void
}

export const EditPhotoInput = ({
	form,
	onSubmit,
	children,
	type
}: Props) => {
	return (
		<FormField
			control={form.control}
			name='image'
			render={({ field }) => (
				<label>
					<input
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								field.onChange(file)
								form.handleSubmit((values: FileImages) =>
									// TODO: Доделать публикацию изображений
									onSubmit(values, type)
								)()
							}
						}}
						accept='image/*'
						name={field.name}
						ref={field.ref}
						hidden
						type='file'
					/>

					{children}
				</label>
			)}
		/>
	)
}
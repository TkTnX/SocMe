import { UseFormReturn } from 'react-hook-form'

import { FormField } from '@/shared/components'
import { ProfileImages } from '@/shared/schemas'

interface Props {
	form: UseFormReturn<ProfileImages>
	children: React.ReactNode
	type: 'avatar' | "cover"
	onSubmit: (values: ProfileImages, type: 'avatar' | 'cover') => void
}

export const EditProfilePhotosInput = ({ form, onSubmit, children, type }: Props) => {
	return (
		<FormField
			control={form.control}
			name='image'
			render={({ field }) => (
				<label >
					<input
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								field.onChange(file)
								form.handleSubmit((values: ProfileImages) =>
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

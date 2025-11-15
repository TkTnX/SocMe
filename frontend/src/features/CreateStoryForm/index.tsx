'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUploads } from '@/api/hooks'
import { EditPhotoInput } from '@/features/EditPhotoInput'
import { Form, Textarea } from '@/shared/components'
import { StorySchema, storySchema } from '@/shared/schemas'

export const CreateStoryForm = () => {
	const [image, setImage] = useState<File | null>(null)
	const [imageUrl, setImageUrl] = useState('')
	const form = useForm<StorySchema>({
		resolver: zodResolver(storySchema),
		defaultValues: {
			text: '',
			image: ''
		}
	})
	const { uploadMutation } = useUploads()
	const { mutate: upload } = uploadMutation()

	const onSubmit = async (values: StorySchema) => {
		console.log(values)
	}

	useEffect(() => {
		const formData = new FormData()

		if (image) {
			formData.append('file', image)
		}

		upload(formData, {
			onSuccess: data => {
				setImageUrl(data)
			}
		})
	}, [image])
									// TODO: Доделать публикацию изображений

	return (
		<Form {...form}>
			<form>
				<EditPhotoInput form={form} onSubmit={onSubmit}>
					<p className='bg-main absolute top-5 right-5 flex cursor-pointer gap-2 rounded-full px-4 py-2 text-white hover:opacity-80'>
						<Plus />
						Добавить изображение
					</p>
				</EditPhotoInput>
				<Textarea placeholder='Что нового...' />
			</form>
		</Form>
	)
}

'use client';

import { FormField } from '.';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';



import { useUploads } from '@/api/hooks';





interface Props {
	children: React.ReactNode
	setVideoUrl: (video: string) => void
}

export const UploadVideoInput = ({ children, setVideoUrl }: Props) => {
	const [video ,setVideo] = useState<File | null>(null)
	const form = useForm({
		defaultValues: {
			video: null
		}
	})
	const { uploadMutation } = useUploads()
	const { mutate, isPending } = uploadMutation(false)

	useEffect(() => {
		if (!video) return
		const formData = new FormData()
		formData.append('file', video)
		console.log(formData.get('file'))
		mutate(formData, {
			onSuccess: data => {
				setVideoUrl(data)
				toast.success('Видео добавлено')
			}
		})
	}, [video])


	return (
		<FormField
			control={form.control}
			name='video'
			render={({ field }) => (
				<label>
					<input
						multiple={true}
						onChange={e => {
							const file = e.target.files?.[0]
							if (file) {
								field.onChange(file)
								setVideo(file)
							}
						}}
						accept='video/*'
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
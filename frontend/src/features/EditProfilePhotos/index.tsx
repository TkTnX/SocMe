'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Camera, Edit } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { EditProfilePhotosInput } from './components'
import { useUploads, useUser } from '@/api/hooks'
import { IUser } from '@/api/types'
import { Cover, Form, Skeleton } from '@/shared/components'
import { ProfileImages, profileImages } from '@/shared/schemas'

interface Props {
	isUserPending: boolean
	user: IUser | null
}

export const EditProfilePhotos = ({ isUserPending, user }: Props) => {
	const { uploadMutation } = useUploads()
	const { editUserProfileMutation } = useUser()
	const { mutate } = uploadMutation()
	const queryClient = useQueryClient()
	const { mutate: mutateUser } = editUserProfileMutation({
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})
	const router = useRouter()

	const form = useForm<ProfileImages>({
		resolver: zodResolver(profileImages),
		defaultValues: {
			image: {} as File
		}
	})

	const onSubmit = async (
		values: ProfileImages,
		type: 'cover' | 'avatar'
	) => {
		const formData = new FormData()
		formData.append('file', values.image)

		mutate(formData, {
			onSuccess: data => {
				mutateUser({
					[type]: data
				})
				toast.success(
					type === 'avatar'
						? 'Аватар успешно обновлён'
						: 'Обложка успешно обновлена'
				)
			}
		})
	}

	return (
		<div className='relative'>
			<Cover isPending={isUserPending} coverUrl={user?.cover} />
			<Form {...form}>
				<form>
					<EditProfilePhotosInput
						type='cover'
						onSubmit={onSubmit}
						form={form}
					>
						<p className='bg-main absolute top-5 right-5 flex cursor-pointer gap-2 rounded-full px-4 py-2 text-white hover:opacity-80'>
							<Edit />
							Редактировать обложку
						</p>
					</EditProfilePhotosInput>
				</form>
			</Form>
			<Form {...form}>
				<form>
					<div className='group absolute -bottom-15 left-1/2 mt-20 h-[150px] w-[150px] -translate-x-1/2 overflow-hidden rounded-full border-2 bg-white'>
						{isUserPending ? (
							<Skeleton className='h-full w-full' />
						) : (
							<Image
								fill
								alt={'Аватар'}
								className='object-cover'
								src={
									user?.avatar ||
									'/images/icons/no-avatar.svg'
								}
							/>
						)}
						<EditProfilePhotosInput
							type='avatar'
							onSubmit={onSubmit}
							form={form}
						>
							<div className='bg-main absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100'>
								<Camera color='#fff' size={48} />
							</div>
						</EditProfilePhotosInput>
					</div>
				</form>
			</Form>
		</div>
	)
}

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Camera, Edit } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGroups, useUploads } from '@/api/hooks'
import { IGroup } from '@/api/types'
import { EditPhotoInput } from '@/features'
import { Cover, Form, Skeleton } from '@/shared/components'
import { FileImages, fileImages } from '@/shared/schemas'

interface Props {
	isPending: boolean
	group: IGroup
}

export const EditGroupPhotos = ({ isPending, group }: Props) => {
	const { uploadMutation } = useUploads()
	const { editGroupMutation } = useGroups()
	const { mutate } = uploadMutation()
	const queryClient = useQueryClient()
	const { mutate: mutateGroup } = editGroupMutation(group.id, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] })
		}
	})

	const form = useForm<FileImages>({
		resolver: zodResolver(fileImages),
		defaultValues: {
			image: {} as File
		}
	})

	const onSubmit = async (values: FileImages, type: 'cover' | 'avatar') => {
		const formData = new FormData()
		formData.append('file', values.image)

		mutate(formData, {
			onSuccess: data => {
				mutateGroup({
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
			<Cover isPending={isPending} coverUrl={group?.cover} />
			<Form {...form}>
				<form>
					<EditPhotoInput
						type='cover'
						onSubmit={onSubmit}
						form={form}
					>
						<p className='bg-main absolute top-5 right-5 flex cursor-pointer gap-2 rounded-full px-4 py-2 text-white hover:opacity-80'>
							<Edit />
							Редактировать обложку
						</p>
					</EditPhotoInput>
				</form>
			</Form>
			<Form {...form}>
				<form>
					<div className='group absolute -bottom-15 left-1/2 mt-20 h-[150px] w-[150px] -translate-x-1/2 overflow-hidden rounded-full border-2 bg-white'>
						{isPending ? (
							<Skeleton className='h-full w-full' />
						) : (
							<Image
								fill
								alt={'Аватар'}
								className='object-cover'
								src={
									group?.avatar ||
									'/images/no-avatar-group.jpg'
								}
							/>
						)}
						<EditPhotoInput
							type='avatar'
							onSubmit={onSubmit}
							form={form}
						>
							<div className='bg-main absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full opacity-0 transition-all group-hover:opacity-100'>
								<Camera color='#fff' size={48} />
							</div>
						</EditPhotoInput>
					</div>
				</form>
			</Form>
		</div>
	)
}

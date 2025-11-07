'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGroups } from '@/api/hooks'
import { IGroup } from '@/api/types'
import { Button, Form } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { EditGroupSchema, editGroupSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	group: IGroup
}

export const EditGroupForm = ({ group }: Props) => {
	const router = useRouter()
	const { editGroupMutation } = useGroups()
	const form = useForm<EditGroupSchema>({
		resolver: zodResolver(editGroupSchema),
		defaultValues: {
			name: group.name || '',
			type: group.type || '',
			address: group.address || '',
			description: group.description || '',
			email: group.email || '',
			phone: group.phone || '',
			website: group.website || ''
		}
	})
	const { mutate, isPending } = editGroupMutation(group.id, {
		onSuccess: () => {
			toast.success('Сообщество обновлено!')
			router.push(`/groups/${group.id}`)
		},
		onError: err => showErrorMessage(err)
	})

	const onSubmit = (values: EditGroupSchema) => mutate(values)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-20 flex flex-col gap-5'
			>
				<FormInput
					disabled={isPending}
					form={form}
					label='Название сообщества'
					name='name'
					placeholder='Моё сообщество'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Тип сообщества'
					name='type'
					placeholder='Категория'
				/>

				<FormInput
					disabled={isPending}
					form={form}
					label='Описание'
					name='description'
					placeholder='...'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Почта'
					name='email'
					placeholder='group@example.com'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Номер телефона'
					name='phone'
					placeholder='+7(___) ___-__-__'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Адрес'
					name='address'
					placeholder='ул. Пушкина, 666'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Сайт'
					name='website'
					placeholder='http://localhost:5000'
				/>

				<Button disabled={isPending}> Сохранить</Button>
			</form>
		</Form>
	)
}

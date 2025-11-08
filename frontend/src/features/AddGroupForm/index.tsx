'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGroups } from '@/api/hooks'
import { IGroup } from '@/api/types'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Form
} from '@/shared/components'
import { CreateGroupSchema, createGroupSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	children: React.ReactNode
}

export const AddGroupForm = ({ children }: Props) => {
	const router = useRouter()
	const { createGroupMutation } = useGroups()
	const { mutate, isPending } = createGroupMutation({
		onSuccess: data => {
			toast.success('Сообщество создано!')
			router.push(`/groups/${data.id}`)
		}
	})
	const form = useForm<CreateGroupSchema>({
		resolver: zodResolver(createGroupSchema),
		defaultValues: {
			name: '',
			type: ''
		}
	})

	const onSubmit = (values: CreateGroupSchema) => mutate(values)

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Создание сообщества</AlertDialogTitle>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-2'
					>
						<FormInput
							disabled={isPending}
							label='Название'
							form={form}
							name='name'
							placeholder='Название сообщества'
						/>
						<FormInput
							disabled={isPending}
							label='Тип'
							form={form}
							name='type'
							placeholder='Категория сообщества'
						/>
						<Button disabled={isPending}>Создать</Button>
					</form>
				</Form>
			</AlertDialogContent>
		</AlertDialog>
	)
}

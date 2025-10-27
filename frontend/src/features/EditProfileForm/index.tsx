'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useUser } from '@/api/hooks'
import { IUser } from '@/api/types'
import { Button, Form } from '@/shared/components'
import { showErrorMessage } from '@/shared/helpers'
import { EditProfileSchema, editProfileSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	user: IUser | null
}

export const EditProfileForm = ({ user }: Props) => {
	const router = useRouter()
	const { editUserProfileMutation } = useUser()
	const form = useForm<EditProfileSchema>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: user?.name,
			bio: user?.bio,
			email: user?.email,
			hobby: user?.hobby,
            websites: user?.websites,
            password: ""
		}
	})
	const { mutate, isPending } = editUserProfileMutation({
		onSuccess: () => {
			toast.success('Профиль обновлён!')
			router.push('/profile')
		},
		onError: err => showErrorMessage(err)
	})

	const onSubmit = (values: EditProfileSchema) => mutate(values)

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='mt-20 flex flex-col gap-5'
			>
				<h3 className='text-main text-xl font-semibold'>
					Настройки аккаунта
				</h3>
				<FormInput
					disabled={isPending}
					form={form}
					label='Имя пользователя'
					name='name'
					placeholder='Тони Старк'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Почта'
					name='email'
					placeholder='tonystark@example.com'
				/>
				<FormInput
					disabled={isPending}
					type='password'
					form={form}
					label='Пароль'
					name='password'
					placeholder='******'
				/>
				<h3 className='text-main mt-5 text-xl font-semibold'>
					Личные данные
				</h3>
				<FormInput
					disabled={isPending}
					form={form}
					label='О себе'
					name='bio'
					placeholder='Помогаю людям'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Сайты (через запятую)'
					name='websites'
					placeholder='https://example.com'
				/>
				<FormInput
					disabled={isPending}
					form={form}
					label='Работа/Хобби'
					name='hobby'
					placeholder='Бизнесмен'
				/>
				<Button disabled={isPending}> Сохранить</Button>
			</form>
		</Form>
	)
}

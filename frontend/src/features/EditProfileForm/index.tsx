'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useUser } from '@/api/hooks'
import { IUser } from '@/api/types'
import { Button, Combobox, Form, FormLabel } from '@/shared/components'
import { RUSSIAN_CITIES } from '@/shared/data'
import { showErrorMessage } from '@/shared/helpers'
import { EditProfileSchema, editProfileSchema } from '@/shared/schemas'
import { FormInput } from '@/widgets/AuthForm/components'

interface Props {
	user: IUser | null
}

export const EditProfileForm = ({ user }: Props) => {
	const router = useRouter()
	const [city, setCity] = useState('')
	const { editUserProfileMutation } = useUser()
	const form = useForm<EditProfileSchema>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: user?.name,
			bio: user?.bio || '',
			email: user?.email,
			hobby: user?.hobby || '',
			websites: user?.websites?.join(', ') || '',
			password: '',
			birthdayDate: user?.birthdayDate || '',
			city: user?.city || city
		}
	})
	const { mutate, isPending } = editUserProfileMutation({
		onSuccess: () => {
			toast.success('Профиль обновлён!')
			router.push('/profile')
		},
		onError: err => showErrorMessage(err)
	})

	const onSubmit = (values: EditProfileSchema) => {
		if (
			Number(values.password?.length) !== 0 &&
			Number(values.password?.length) < 6
		) {
			return toast.error('Минмальная длина пароля - 6 символов')
		}

		const websites =
			values.websites?.split(',').map((value: string) => value.trim()) ||
			[]

		mutate({ ...values, websites, city })
	}

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
					type='date'
					label='Дата рождения'
					name='birthdayDate'
					placeholder='19-03-2009'
				/>
				<label>
					<FormLabel>Город</FormLabel>
					<Combobox
						defaultValue={form.getValues("city")}
						className='mt-2 !w-full border'
						onChange={value => setCity(value)}
						items={RUSSIAN_CITIES}
					/>
				</label>

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

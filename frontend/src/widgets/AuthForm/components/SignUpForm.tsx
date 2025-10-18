import { FormInput } from '.'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuth } from '@/api/hooks'
import { Button, Form } from '@/shared/components'
import { SignUpSchema, signUpSchema } from '@/shared/schemas'

export const SignUpForm = () => {
	const router = useRouter()
	const { signUpMutation } = useAuth()

	const { mutate, isPending } = signUpMutation({
		onSuccess: () => {
			router.push('/')
			toast.success('Успешная регистрация!')
		},
		onError: error => {
			const err = error as AxiosError<{
				message: string
				error: string
				statusCode: number
			}>

			toast.error(err.response?.data.message)
		}
	})

	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: ''
		}
	})

	const onSubmit = async (values: SignUpSchema) => {
		mutate(values)
	}

	return (
		<Form {...form}>
			<form
				className='mt-5 flex flex-col gap-4'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInput
					form={form}
					label='Имя пользователя'
					name='name'
					placeholder='Тони Старк'
				/>
				<FormInput
					form={form}
					label='Почта'
					name='email'
					placeholder='tonystark@example.com'
				/>
				<FormInput
					type="password"
					form={form}
					label='Пароль'
					name='password'
					placeholder='******'
				/>
				<Button disabled={isPending}> Зарегистрироваться</Button>
			</form>
		</Form>
	)
}

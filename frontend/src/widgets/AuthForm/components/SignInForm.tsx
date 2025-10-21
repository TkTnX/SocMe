import { FormInput } from '.'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuth } from '@/api/hooks'
import { Button, Form } from '@/shared/components'
import { SignInSchema, signInSchema } from '@/shared/schemas'
import { AxiosError } from 'axios'

export const SignInForm = () => {
	const router = useRouter()
	const { signInMutation } = useAuth()
	const { mutate, isPending } = signInMutation({
		onSuccess: () => {
			toast.success('Успешный вход в аккаунт!')
			router.push('/')
		},
		onError: error => {
			const err = error as AxiosError<{
				message: string
				error: string
				statusCode: number
			}>
console.log(err.response)
			toast.error(err.response?.data.message)
		}
	})
	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const onSubmit = (values: SignInSchema) => {
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
					label='Почта'
					name='email'
					placeholder='tonystark@example.com'
				/>
				<FormInput
					type='password'
					form={form}
					label='Пароль'
					name='password'
					placeholder='******'
				/>
				<Button disabled={isPending}> Войти</Button>
			</form>
		</Form>
	)
}

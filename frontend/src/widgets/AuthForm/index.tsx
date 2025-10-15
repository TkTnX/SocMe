'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { FormInput } from './components'
import { Block, Button, Form } from '@/shared/components'
import { SignUpSchema, signUpSchema } from '@/shared/schemas'

interface Props {
	type: 'signUp' | 'signIn'
}

export const AuthForm = ({ type }: Props) => {
	const isSignUp = type === 'signUp'
    // TODO: Доделать различие signup/signin
	const form = useForm<SignUpSchema>({
		resolver: zodResolver(signUpSchema)
	})

	const onSubmit = async (values: SignUpSchema) => {
		console.log(values)
	}

	return (
		<Block className='mx-auto w-full max-w-[500px]'>
			<h3 className='text-center text-2xl font-bold text-black'>
				{isSignUp ? 'Регистрация' : 'Вход в аккаунт'}
			</h3>
			<Form {...form}>
				<form
					className='mt-5 flex flex-col gap-4'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					{isSignUp && (
						<FormInput
							form={form}
							label='Имя пользователя'
							name='name'
							placeholder='Тони Старк'
						/>
					)}
					<FormInput
						form={form}
						label='Почта'
						name='email'
						placeholder='tonystark@example.com'
					/>
					<FormInput
						form={form}
						label='Пароль'
						name='password'
						placeholder='******'
					/>
					<Button>
						{' '}
						{isSignUp ? 'Зарегистрироваться' : 'Войти'}
					</Button>
				</form>
				{isSignUp ? (
					<p className='mt-4 text-center'>
						Уже есть аккаунт?{' '}
						<Link
							className='hover:text-main text-[#3589b2]'
							href={'/auth/sign-in'}
						>
							Войти
						</Link>
					</p>
				) : (
					<p className='mt-4 text-center'>
						Ещё нет аккаунта?{' '}
						<Link
							className='hover:text-main text-[#3589b2]'
							href={'/auth/sign-up'}
						>
							Регистрация
						</Link>
					</p>
				)}
			</Form>
		</Block>
	)
}

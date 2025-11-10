'use client'

import Link from 'next/link'

import { SignInForm, SignUpForm } from './components'
import { GoogleOAuthButton } from '@/features'
import { Block } from '@/shared/components'

interface Props {
	type: 'signUp' | 'signIn'
}

export const AuthForm = ({ type }: Props) => {
	const isSignUp = type === 'signUp'

	return (
		<Block className='mx-auto w-full max-w-[500px]'>
			<h3 className='text-center text-2xl font-bold text-black'>
				{isSignUp ? 'Регистрация' : 'Вход в аккаунт'}
			</h3>
			{isSignUp ? <SignUpForm /> : <SignInForm />}
			<div className='mt-4'>
				<GoogleOAuthButton />
			</div>
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
		</Block>
	)
}

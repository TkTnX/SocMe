import { AuthForm } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Вход в аккаунт | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const SignInPage = () => {
	return <AuthForm type='signIn' />
}

export default SignInPage
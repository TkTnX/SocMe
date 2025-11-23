import { AuthForm } from '@/widgets';
import { Metadata } from 'next';





export const metadata: Metadata = {
	title: 'Регистрация на сайте | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const SignUpPage = () => {
	return <AuthForm type='signUp' />
}

export default SignUpPage
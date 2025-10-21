import { axiosInstance, saveToken } from '@/shared/lib'
import { SignInSchema, SignUpSchema } from '@/shared/schemas'

export const signUp = async (values: SignUpSchema) => {
	const { data } = await axiosInstance.post('/auth/sign-up', values)

	if (data) saveToken(data)

	return data
}
export const signIn = async (values: SignInSchema) => {
	const { data } = await axiosInstance.post('/auth/sign-in', values)

	if (data) saveToken(data)

	return data
}

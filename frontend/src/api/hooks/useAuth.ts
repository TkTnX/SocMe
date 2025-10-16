import { UseMutationOptions, useMutation } from '@tanstack/react-query'

import { signIn, signUp } from '@/api/requests/auth'
import { SignInSchema, SignUpSchema } from '@/shared/schemas'

export function useAuth() {
	const signUpMutation = (
		options?: Omit<
			UseMutationOptions<SignUpSchema, unknown, SignUpSchema>,
			'mutationKey' | 'mutationFn'
		>
	) => {
		return useMutation({
			mutationKey: ['sign up'],
			mutationFn: async (values: SignUpSchema) => await signUp(values),
			...options
		})
	}

	const signInMutation = (
		options?: Omit<
			UseMutationOptions<SignInSchema, unknown, SignInSchema>,
			'mutationKey' | 'mutationFn'
		>
	) => {
		return useMutation({
			mutationKey: ['sign in'],
			mutationFn: async (values: SignInSchema) => await signIn(values),
			...options
		})
	}

	return {
		signUpMutation,
		signInMutation
	}
}

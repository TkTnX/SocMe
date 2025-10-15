import { z } from 'zod'

export const signInSchema = z.object({

	email: z.email('Введите почту!'),
	password: z
		.string('Пароль должен быть строкой!')
		.min(6, 'Минимальная длина пароля - 6 символов!')
})

export type SignInSchema = z.infer<typeof signInSchema>

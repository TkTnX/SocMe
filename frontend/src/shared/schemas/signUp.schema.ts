import { z } from 'zod'

export const signUpSchema = z.object({
	name: z
		.string('Имя должно быть строкой!')
		.min(3, 'Минимальная длина имени профиля - 3 символа'),
	email: z.email('Введите почту!'),
	password: z
		.string('Пароль должен быть строкой!')
		.min(6, 'Минимальная длина пароля - 6 символов!')
})

export type SignUpSchema = z.infer<typeof signUpSchema>

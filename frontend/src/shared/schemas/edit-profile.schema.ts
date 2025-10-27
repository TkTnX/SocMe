import z from 'zod'

export const editProfileSchema = z.object({
	name: z
		.string('Имя должно быть строкой!')
		.min(3, 'Минимальная длина имени профиля - 3 символа'),

	email: z.email('Введите почту!'),
	password: z.string('Пароль должен быть строкой!').optional(),
	bio: z.string().optional(),
	websites: z.array(z.url('Введите url сайта')).optional(),
	hobby: z.string().max(15).optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>

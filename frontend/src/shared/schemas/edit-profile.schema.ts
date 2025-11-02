import z from 'zod'

export const editProfileSchema = z.object({
	name: z
		.string('Имя должно быть строкой!')
		.min(3, 'Минимальная длина имени профиля - 3 символа'),

	email: z.email('Введите почту!'),
	password: z.string('Пароль должен быть строкой!').optional(),
	bio: z.string().optional(),
	websites: z.string().optional(),
	hobby: z.string().max(15).optional(),
	avatar: z.url('URL аватарки должен быть строкой').optional(),
	cover: z.url('URL Обложки должен быть строкой').optional(),
	birthdayDate: z.string().optional(),
	city: z.string().optional()
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>

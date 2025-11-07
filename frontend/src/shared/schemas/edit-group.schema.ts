import z from 'zod'

export const editGroupSchema = z.object({
	name: z
		.string('Имя должно быть строкой!')
		.min(3, 'Минимальная длина названия сообщества - 3 символа'),

	type: z
		.string()
		.min(3, 'Минимальная длина категории сообщетсва - 3 символа'),
	description: z.string().optional(),
	phone: z.string().optional(),
	email: z.string().optional(),
	website: z.string().optional(),
	address: z.string().optional()
})

export type EditGroupSchema = z.infer<typeof editGroupSchema>

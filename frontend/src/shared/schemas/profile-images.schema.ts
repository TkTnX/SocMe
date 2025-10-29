import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/shared/constants';
import z from 'zod';





export const profileImages = z.object({
	image: z
		.instanceof(File, {message: "Изображение обязательно"})
		.refine(
			file => file.size <= MAX_FILE_SIZE,
			`Максимальный размер файла - 10 МБ`
		)
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Файл должен быть одним из расширений: .jpg, .jpeg, .png and .webp'
		)
})

export type ProfileImages = z.infer<typeof profileImages>
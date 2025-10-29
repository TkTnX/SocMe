import { z } from 'zod'

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/shared/constants'

export const postSchema = z.object({
	text: z.string(),
	images: z.array(z.any()).optional()
})

export const postImagesSchema = z.object({
	images: z
		.any()
		.refine(
			files => files.size <= MAX_FILE_SIZE,
			`Максимальный размер файла - 10 МБ`
		)
		.refine(
			file => ACCEPTED_IMAGE_TYPES.includes(file.type),
			'Файл должен быть одним из расширений: .jpg, .jpeg, .png and .webp'
		)
})

export type PostSchema = z.infer<typeof postSchema>
export type PostImagesSchema = z.infer<typeof postImagesSchema>

import { z } from 'zod'

export const storySchema = z.object({
	text: z.string('Имя должно быть строкой!').optional(),
	image: z.any()
})

export type StorySchema = z.infer<typeof storySchema>

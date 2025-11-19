import z from 'zod'

export const messageSchema = z.object({
	text: z.string().nonempty('Начните что-то писать'),
	image: z.any()
})

export type MessageSchema = z.infer<typeof messageSchema>

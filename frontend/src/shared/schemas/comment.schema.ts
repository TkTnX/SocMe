import z from "zod"

export const commentSchema = z.object({
    text: z.string().nonempty(),
    image: z.string().nullable()
})

export type CommentSchema = z.infer<typeof commentSchema>
import z from "zod"

export const commentSchema = z.object({
    text: z.string().nonempty(),
    replyToId: z.string().nullable(),
    image: z.string().nullable()
})

export type CommentSchema = z.infer<typeof commentSchema>
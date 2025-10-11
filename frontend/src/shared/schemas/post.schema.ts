import { z } from "zod"
 
// TODO: Дополнить
export const postSchema = z.object({
    text: z.string()
})

export type PostSchema = z.infer<typeof postSchema>
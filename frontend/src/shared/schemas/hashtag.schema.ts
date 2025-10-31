import { z } from 'zod'


export const hashtagSchema = z.object({
   name: z.string()
})



export type HashtagSchema = z.infer<typeof hashtagSchema>

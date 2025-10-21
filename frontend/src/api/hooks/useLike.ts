import { UseMutationOptions, useMutation } from "@tanstack/react-query";



import { like } from "@/api/requests";





export function useLike() {
    const likeMutation = (
        type: string,
		id: string,
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationFn' | 'mutationKey' 
		>
	) =>
		useMutation({
			mutationFn: () => like(type, id),
			mutationKey: ['like'],
		
			...options
		})

    return {
        likeMutation
    }
}
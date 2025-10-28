import { UseMutationOptions, useMutation } from "@tanstack/react-query";



import { uploadFile } from "@/api/requests";





export function useUploads() {

    const uploadMutation = (
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['upload file'],
			mutationFn: (body: FormData) => uploadFile(body),
			...options
		})

    return {
        uploadMutation
    }
}
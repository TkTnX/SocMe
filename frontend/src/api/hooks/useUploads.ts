import { UseMutationOptions, useMutation } from "@tanstack/react-query";



import { uploadFile, uploadFiles } from "@/api/requests";





export function useUploads() {

	const uploadMutation = (
		isMany?: boolean,
		options?: Omit<
			UseMutationOptions<any, unknown, any>,
			'mutationKey' | 'mutationFn'
		>
	) =>
		useMutation({
			mutationKey: ['upload file'],
			mutationFn: (body: FormData) => isMany ? uploadFiles(body) : uploadFile(body),
			...options
		})

    return {
        uploadMutation
    }
}
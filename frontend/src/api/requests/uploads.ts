import { axiosInstance } from '@/shared/lib';





export const uploadFile = async (formData: FormData) => {
	const { data } = await axiosInstance.post('/files/images', formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})


	return data.path
}
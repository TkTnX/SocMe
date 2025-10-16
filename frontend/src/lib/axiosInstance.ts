import axios, { CreateAxiosDefaults } from 'axios';





const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
}

export const axiosInstance = axios.create(options)


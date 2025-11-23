import { getSocket } from '@/api/socket-api'
import axios, { CreateAxiosDefaults } from 'axios'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json'
	}
}

let isRefreshing = false
let accessToken: string | null = null
let failedQueue: any[] = []

export const axiosInstance = axios.create(options)

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})

	failedQueue = []
}

axiosInstance.interceptors.request.use(config => {
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosInstance.interceptors.response.use(
	res => res,
	async error => {
		const { response, config } = error

		if (!response || !config) return Promise.reject(error)

		if (
			config.url?.includes('/auth/sign-in') ||
			config.url?.includes('/auth/sign-up')
		) {
			return Promise.reject(error)
		}

		if (config.url?.includes('/auth/refresh')) {
			return Promise.reject(error)
		}

		if (response.status === 401 && !config._retry) {
			if (isRefreshing) {
				return new Promise(function (resolve, reject) {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						config.headers.Authorization = `Bearer ${token}`
						return axiosInstance(config)
					})
					.catch(err => Promise.reject(err))
			}

			config._retry = true
			isRefreshing = true

			try {
				const { data } = await axiosInstance.get('/auth/refresh')
				accessToken = data.access_token
				const socket = getSocket()
				if (socket) {
					// @ts-ignore
					socket.auth.token = accessToken
					socket.connect()
				}

				processQueue(null, accessToken)

				config.headers.Authorization = `Bearer ${accessToken}`
				return axiosInstance(config)
			} catch (error) {
				processQueue(error, null)
				return Promise.reject(error)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(error)
	}
)

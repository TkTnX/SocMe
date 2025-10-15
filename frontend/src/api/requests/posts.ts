import { IPost, IPostRequest } from '@/api/types';
import { axiosInstance } from '@/lib';





export const getPosts = async () => {
    const { data } = await axiosInstance.get<IPost[]>('/posts')

    return data
}

export const createPost = async (values: IPostRequest) => {
    const { data } = await axiosInstance.post<IPost>('/posts', values)
    
    return data
}
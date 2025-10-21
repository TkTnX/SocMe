import { axiosInstance } from "@/lib";

export const like = async (type: string, id: string) => {
    const { data } = await axiosInstance.post(`/likes/${type}/${id}`)
    
    return data
}
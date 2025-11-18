import { ISubscription } from "@/api/types"
import { axiosInstance } from "@/shared/lib"

export const getSubscription = async (): Promise<ISubscription[]> => {
    const { data } = await axiosInstance.get("/subscriptions")
    
    return data
}
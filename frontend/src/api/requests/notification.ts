import { axiosInstance } from "@/shared/lib"

export const updateNotificationStatus = async () => {
    const { data } = await axiosInstance.patch(`/notifications`)
    
    return data
}

export const deleteNotification = async (notificationId: string) => {
    const { data } = await axiosInstance.delete(`/notifications/${notificationId}`)
    
    return data
}
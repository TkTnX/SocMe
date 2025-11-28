export interface INotification {
    id: string

    title: string
    content?: string
    icon?: string

    isRead: boolean

    userId: string
    createdAt: string
}
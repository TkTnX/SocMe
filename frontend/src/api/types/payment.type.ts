export interface ICreatePayment {
    value: number
    subscriptionId: string
} 

export interface IPayment {
    confirmation: {
        confirmation_url: string
    }
}
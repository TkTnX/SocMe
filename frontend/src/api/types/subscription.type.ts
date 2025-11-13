import { IUser } from '.'

export interface ISubscription {}
export interface IUserSubscription {
	id: string

	status: ESubscriptionStatuses

	subscription?: ISubscription
	subscriptionId: string

	user?: IUser
	userId: string

	expiresAt: string
}

enum ESubscriptionStatuses {
	PENDING,
	SUCCEEDED,
	FAILED
}

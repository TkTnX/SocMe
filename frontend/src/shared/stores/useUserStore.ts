import { create } from 'zustand'

import { IUser } from '@/api/types'

interface UserStoreProps {
	user: IUser | null
	setUser: (user: IUser) => void
}

export const useUserStore = create<UserStoreProps>(set => ({
	user: null,

	setUser: (user: IUser) => {
		set({ user })
	}
}))

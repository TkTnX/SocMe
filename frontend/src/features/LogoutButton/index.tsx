'use client'

import { useAuth } from '@/api/hooks'
import { Button } from '@/shared/components'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const LogoutButton = () => {
    const { logoutMutation } = useAuth()
    const router = useRouter()

    const { mutate, isPending } = logoutMutation({
        onSuccess: () => {
            toast.success("Успешный выход из аккаунта")
            router.push('/')
        }
    })

	return (
		<Button disabled={isPending} className='bg-red-500' onClick={mutate}>
			Выйти из аккаунта
		</Button>
	)
}

import Image from 'next/image'

import { Button } from '@/shared/components'

export const YandexOAuthButton = () => {
	return (
    <Button variant={'outline'} className='flex-1' asChild>
      {/* TODO: Сделать вход через yandex */}
			<a href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/yandex`}>
				<Image
					alt='google'
					src={'/images/icons/yandex.svg'}
					width={30}
					height={30}
				/>
				Войти через Yandex
			</a>
		</Button>
	)
}

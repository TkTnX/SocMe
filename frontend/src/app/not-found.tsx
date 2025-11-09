import Link from 'next/link'

import { Button } from '@/shared/components'

const NotFoundPage = () => {
	return (
		<div className='flex min-h-screen w-full flex-col items-center justify-center gap-2'>
			<h1 className='text-main text-[128px] leading-[100px] font-bold'>
				404
			</h1>
			<p className='text-2xl'>Запрашиваемая вами страница не найдена!</p>
			<Button asChild>
				<Link href={'/'}>На главную</Link>
			</Button>
		</div>
	)
}

export default NotFoundPage

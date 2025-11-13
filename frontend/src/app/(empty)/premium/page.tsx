import Image from 'next/image'

import { CreatePaymentButton } from '@/features'
import { Block, Button } from '@/shared/components'

const PremiumPage = () => {
	return (
		<div className='flex min-h-screen w-full flex-col items-center'>
			<div>
				<h1 className='vsm:text-6xl text-center text-3xl font-bold text-black lg:text-9xl lg:leading-36 dark:text-white'>
					Подписка <span className='text-main'>SocMe</span>
				</h1>
				<p className='vsm:text-lg text-center text-base lg:text-2xl'>
					Оформите премиум, чтобы получить больше функций
				</p>
			</div>
			<Block className='relative mt-10 flex min-h-[500px] max-w-[500px] flex-col items-center justify-between gap-5 text-center'>
				<div className='flex flex-col items-center justify-center gap-4'>
					<Image
						className='z-10'
						src={'/images/icons/premium-icon.svg'}
						alt='premium'
						width={50}
						height={50}
					/>
					<h3 className='z-10 text-2xl font-bold md:text-4xl'>
						Все возможности
					</h3>
					<p className='z-10 text-lg md:text-2xl'>
						Единый план для всех продуктов
					</p>
				</div>
				<p className='z-10 text-7xl font-bold text-black dark:text-white'>
					349₽{' '}
					<span className='text-base text-gray-500'>/ месяц</span>
				</p>
				{/* TODO: получать доступные подписки и выводить их тут */}
				<p className='text-sm md:text-base'>
					Оформив подписку, вы сможете открыть доступ к сторис и
					уникальному статусу, который будет виден всем!
				</p>
				<CreatePaymentButton subscriptionId={'1'} value={349} />
			</Block>
		</div>
	)
}

export default PremiumPage

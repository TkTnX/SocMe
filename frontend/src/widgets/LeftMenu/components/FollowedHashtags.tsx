import { Block } from '@/shared/components'
import { PlusSquareIcon } from 'lucide-react'


const TEMP_HASHTAGS = [
	'#работа',
	'#программирование',
	'#javascript',
	'#ux',
	'#хочуврек',
	'#доллар',
	'#привет'
]

export const FollowedHashtags = () => {
	return (
		<Block>
			<div className='flex items-center justify-between border-b pb-1'>
				<h4 className='uppercase'>Любимые хэштеги</h4>
				<button className='hover:opacity-80'>
					<PlusSquareIcon color='var(--color-text)' />
				</button>
			</div>

			<div className='mt-3.5 flex flex-wrap gap-2.5'>
				{TEMP_HASHTAGS.map((hashtag, index) => (
					<p className='rounded bg-[#e9f0f8] px-2 py-1' key={index}>
						{hashtag}
					</p>
				))}
			</div>
		</Block>
	)
}

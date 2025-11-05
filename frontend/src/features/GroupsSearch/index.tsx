'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

import { Block, Input } from '@/shared/components'

export const GroupsSearch = () => {
	const [name, setName] = useState('')
	const [value] = useDebounce(name, 1000)
	return (
		<Block className='w-full py-3'>
			<label className='flex w-full items-center'>
				<Search />
				<Input
					placeholder='Поиск сообществ'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</label>
		</Block>
	)
}

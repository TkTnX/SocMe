'use client'

import { Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { useUser } from '@/api/hooks'
import { Input } from '@/shared/components'

export const AddComment = () => {
	const { user, isUserPending } = useUser()
	const [value, setValue] = useState('')

	if (isUserPending) return null
	return (
		<form className='bg-bg mt-4 flex items-center rounded-2xl px-2'>
			<Image
				src={user?.avatar || '/images/icons/no-avatar.svg'}
				width={26}
				height={26}
				className='rounded-full object-cover'
				alt='user avatar'
			/>
			<Input
				value={value}
				onChange={e => setValue(e.target.value)}
				placeholder='Написать комментарий...'
				className='py-4'
			/>
			<button className='hover:opacity-80'>
				<Image
					src={'/images/icons/imageIcon.svg'}
					alt='Добавить фото'
					width={16}
					height={16}
				/>
			</button>
			{value.length ? (
				<button className='pl-2'>
					<Send size={18} className='hover:stroke-main stroke-1' />
				</button>
			) : (
				''
			)}
		</form>
	)
}

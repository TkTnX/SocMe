'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { PeopleSearchBy } from './components'
import {
	Block,
	Button,
	Combobox,
	Input,
	Label,
	RadioGroup,
	RadioGroupItem
} from '@/shared/components'
import { RUSSIAN_CITIES } from '@/shared/data'
import { cn } from '@/shared/lib'

interface Props {
	isMobile?: boolean
	onClose?: () => void
}

export const PeopleFilterMenu = ({ isMobile = false, onClose }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [city, setCity] = useState<string | undefined>(undefined)
	const [age, setAge] = useState<[undefined | number, undefined | number]>([
		undefined,
		undefined
	])
	const [gender, setGender] = useState<string | undefined>(undefined)

	const onSubmit = () => {
		let query = ''

		if (city) {
			query = query + `city=${city}&`
		}

		if (age[0] && age[0] >= 14) {
			query = query + `ageFrom=${age[0]}&`
		} else if (age[0] && age[0] < 14) {
			toast.error('Минимальный возраст - 14 лет')
		}
		if (age[1] && age[1] <= 100) {
			query = query + `ageTo=${age[1]}&`
		} else if (age[1] && age[1] > 100) {
			toast.error('Максимальный возраст - 100 лет')
		}

		if (gender) {
			query = query + `gender=${gender}&`
		}

		router.push(`?${query}`)
		onClose?.()
	}

	return (
		<div
			className={cn(
				'flex w-full flex-col gap-6 md:flex lg:max-w-[280px]',
				{ 'hidden max-w-[200px]': !isMobile }
			)}
		>
			<PeopleSearchBy />
			{pathname === '/people' ? (
				<Block>
					<h4 className='text-main font-bold'>Параметры поиска</h4>
					<div className='mt-2 flex flex-col gap-2'>
						<label className='flex flex-col gap-1'>
							<span className='text-xs'>Город</span>
							<Combobox
								className='mt-1 border'
								onChange={value => setCity(value)}
								items={RUSSIAN_CITIES}
							/>
						</label>
						<div>
							<span className='text-xs'>Возраст</span>
							<div className='mt-1 flex gap-4'>
								<Input
									min={14}
									type='number'
									value={age[0] || ''}
									onChange={e =>
										setAge([Number(e.target.value), age[1]])
									}
									className='flex-1 border'
									placeholder='От 14'
								/>
								<Input
									max={100}
									type='number'
									value={age[1] || ''}
									onChange={e =>
										setAge([age[0], Number(e.target.value)])
									}
									className='flex-1 border'
									placeholder='До 100'
								/>
							</div>
						</div>
						<div className='border-b pb-2'>
							<span className='text-xs'>Пол</span>

							<RadioGroup
								onValueChange={setGender}
								defaultValue='any'
								className='mt-1'
							>
								<div className='flex items-center gap-3'>
									<RadioGroupItem id='any' value={'any'} />
									<Label
										className='cursor-pointer'
										htmlFor='any'
									>
										Любой
									</Label>
								</div>
								<div className='flex items-center gap-3'>
									<RadioGroupItem id='MALE' value={'MALE'} />
									<Label
										className='cursor-pointer'
										htmlFor='MALE'
									>
										Мужской
									</Label>
								</div>
								<div className='flex items-center gap-3'>
									<RadioGroupItem
										id='FEMALE'
										value={'FEMALE'}
									/>
									<Label
										className='cursor-pointer'
										htmlFor='FEMALE'
									>
										Женский
									</Label>
								</div>
							</RadioGroup>
						</div>
						{(city || gender || age[0] || age[1]) && (
							<Button className='mt-2' onClick={onSubmit}>
								Применить
							</Button>
						)}
						{searchParams.size > 0 && (
							<button onClick={() => router.push(`/people`)}>
								Сбросить фильтры
							</button>
						)}
					</div>
				</Block>
			) : (
				''
			)}
		</div>
	)
}

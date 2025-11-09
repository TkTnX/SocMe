'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/shared/components/ui/Button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/shared/components/ui/Command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/components/ui/Popover'
import { cn } from '@/shared/lib'

interface Props {
	items: string[]
	onChange: (value: string) => void
	className?: string
	defaultValue?: string
}

export function Combobox({ items, className, onChange, defaultValue }: Props) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(defaultValue)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				className={cn('border-input text-inherit', className)}
				asChild
			>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'
				>
					{defaultValue && defaultValue === value
						? defaultValue
						: value
							? items.find(item => item === value)
							: 'Найти город'}
					<ChevronsUpDown className='opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Найти город' className='h-9' />
					<CommandList>
						<CommandEmpty>Город не найден</CommandEmpty>
						<CommandGroup>
							{items.map((item, index) => (
								<CommandItem
									key={index}
									value={item}
									onSelect={val => {
										setValue(val === value ? '' : val)
										onChange(val)
										setOpen(false)
									}}
								>
									{item}
									<Check
										className={cn(
											'ml-auto',
											value === item
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

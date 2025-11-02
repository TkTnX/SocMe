'use client'

import { Filter } from 'lucide-react'
import { useState } from 'react'

import {
	Button,
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger
} from '@/shared/components/ui'
import { PeopleFilterMenu } from '@/widgets'

export const PeopleFilterSheet = () => {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button className='flex md:hidden' variant={'outline'}>
					<Filter />
					Фильтрация
				</Button>
			</SheetTrigger>
			<SheetContent className='w-full !max-w-full' side='left'>
				<SheetTitle />
				<PeopleFilterMenu
					onClose={() => setOpen(false)}
					isMobile={true}
				/>
			</SheetContent>
		</Sheet>
	)
}

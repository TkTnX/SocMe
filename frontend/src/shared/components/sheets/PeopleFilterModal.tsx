'use client'

import { Filter } from 'lucide-react'
import { Suspense, useState } from 'react'

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
				<Suspense>
					<PeopleFilterMenu
					onClose={() => setOpen(false)}
					isMobile={true}
				/>
				</Suspense>
			</SheetContent>
		</Sheet>
	)
}

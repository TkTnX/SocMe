'use client'

import { useState } from 'react'

import { CreateStoryForm } from '@/features'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/shared/components/ui'

interface Props {
	children: React.ReactNode
}

export const CreateStoryModal = ({ children }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>Новая история</DialogTitle>
				<CreateStoryForm setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	)
}

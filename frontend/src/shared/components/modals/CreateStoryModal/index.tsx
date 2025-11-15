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
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
                <DialogTitle>Новая история</DialogTitle>
                <CreateStoryForm />
			</DialogContent>
		</Dialog>
	)
}

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger, Button } from '@/shared/components';





interface Props {
	children: React.ReactNode
    onSubmit: () => void
    open: boolean
    setOpen: (bool: boolean) => void
}

export const ConfirmationModal = ({ children, onSubmit,open, setOpen }: Props) => {
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Вы уверены?</AlertDialogTitle>
				<AlertDialogFooter className='flex items-center justify-self-end'>
					<Button onClick={() => setOpen(false)}>Отмена</Button>
					<Button onClick={onSubmit} className='bg-red-500 hover:bg-red-700'>
						Подтвердить
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
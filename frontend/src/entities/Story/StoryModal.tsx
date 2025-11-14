import { AlertDialog, AlertDialogContent, AlertDialogTrigger } from "@/shared/components"

interface Props {
    children: React.ReactNode
}



export const StoryModal = ({children}: Props) => {
  return (
      <AlertDialog >
          <AlertDialogTrigger>{children}</AlertDialogTrigger>
          <AlertDialogContent>
          </AlertDialogContent>
    </AlertDialog>
  )
}

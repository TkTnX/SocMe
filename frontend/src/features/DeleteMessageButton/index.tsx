import { getSocket } from "@/api/socket-api";
import { Button } from "@/shared/components";



interface Props {
    messageId: string
    chatId: string
}

export const DeleteMessageButton = ({messageId, chatId}: Props) => {
    	const onDelete = async () => {
			const socket = getSocket()
			socket.emit('delete-message', { messageId, chatId })
		}
  return (
<Button onClick={onDelete}>Удалить</Button>
  )
}
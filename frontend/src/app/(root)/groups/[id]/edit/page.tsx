import { EditGroup } from "@/widgets";
import { Metadata } from "next";





export const metadata: Metadata = {
	title: 'Редактирование сообщества | SocMe',
	description: 'SocMe - делитесь новостями, общайтесь и находите друзей!'
}

const EditGroupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
	return <EditGroup groupId={id} />
}

export default EditGroupPage
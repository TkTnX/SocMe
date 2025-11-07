import { EditGroup } from "@/widgets"

const EditGroupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id
	return <EditGroup groupId={id} />
}

export default EditGroupPage
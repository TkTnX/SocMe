import { BigGroup } from '@/entities'

const GroupPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id
	return <BigGroup id={id} />
}

export default GroupPage

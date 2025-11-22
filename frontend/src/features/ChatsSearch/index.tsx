import { Input } from '@/shared/components';





interface Props {
	setSearch: (value: string) => void
	search: string
}

export const ChatsSearch = ({ setSearch, search }: Props) => {
	return <Input onChange={(e) => setSearch(e.target.value)} value={search} className='mt-4 border' placeholder='Найти собеседника...' />
}
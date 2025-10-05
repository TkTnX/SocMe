import { SearchIcon } from 'lucide-react'

export const Search = () => {
	return (
		<div className='flex items-center gap-2.5'>
			<div className='hidden h-11 w-[1px] bg-black/20 md:block' />

			<form className='flex items-stretch overflow-hidden'>
				<input
					className='text-text bg-bg vsm:px-3.5 vsm:py-4 rounded-l-2xl px-2 py-3 text-xs placeholder:text-xs'
					placeholder='Найти что-нибудь'
					type='text'
				/>
				<button className='bg-main vsm:w-[60px] flex w-10 items-center justify-center rounded-r-2xl'>
					<SearchIcon
						color='#1c1c1c'
						size={20}
						className='opacity-70'
					/>
				</button>
			</form>
		</div>
	)
}

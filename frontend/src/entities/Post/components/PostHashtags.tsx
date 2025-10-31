import Link from 'next/link'

import { IHashtag } from '@/api/types'

interface Props {
	hashtags: IHashtag[]
}

export const PostHashtags = ({ hashtags }: Props) => {
	return (
		<div className='mt-4 flex flex-col flex-wrap gap-2'>
			{hashtags.map(hashtag => (
                <Link
                    key={hashtag.id}
					href={`/posts?hashtag=${hashtag.name}`}
					className='text-main border-main hover:bg-main rounded-full border px-2 py-1 text-center transition hover:text-white w-fit'
				>
					{hashtag.name}
				</Link>
			))}
		</div>
	)
}

'use client'

import { Info, Text } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { useGroups, useUser } from '@/api/hooks'
import { AddPostForm, FollowButton } from '@/features'
import { Block, Cover, GroupDropdown, Skeleton } from '@/shared/components'
import { GroupMoreInfo } from '@/shared/components/modals'
import { PostsList } from '@/widgets'

interface Props {
	id: string
}

export const BigGroup = ({ id }: Props) => {
	const { user } = useUser()
	const { getGroupByIdQuery } = useGroups()
	const { data, isPending } = getGroupByIdQuery(id)

	if (!isPending && !data) return notFound()
	return (
		<div className='flex-1'>
			<Block className='relative'>
				<Cover isPending={isPending} coverUrl={data?.cover} />
				<div className='vsm:flex-row vsm:items-center vsm:gap-4 flex flex-col'>
					<div className='relative -mt-12 ml-1 h-[100px] w-[100px] overflow-hidden rounded-full border-2 bg-white sm:ml-10'>
						{isPending ? (
							<Skeleton className='h-full w-full' />
						) : (
							<Image
								fill
								alt={data.name}
								className='object-cover'
								src={
									data?.avatar ||
									'/images/no-avatar-group.jpg'
								}
							/>
						)}
					</div>
					<div>
						<h3 className='text-2xl text-black'>{data?.name}</h3>
						<p className='text-xs'>{data?.type}</p>
					</div>
					<div className='vsm:ml-auto vsm:w-auto vsm:mt-0 mt-4 flex w-full items-center gap-2'>
						<FollowButton
							className={'vsm:w-auto w-full'}
							type='GROUP'
							followId={id}
						/>
						{data?.admins?.find(admin => admin.id === user?.id) && (
							<GroupDropdown groupId={data.id} />
						)}
					</div>
				</div>
			</Block>
			<div>
				<div className='flex flex-col-reverse items-start gap-4 md:flex-row'>
					<div className='mt-4 flex-1'>
						<AddPostForm
							groupId={data?.id}
						/>
						<PostsList
							className={'w-full flex-1 md:w-auto'}
							userPosts={data?.posts || undefined}
						/>
					</div>
					<div className='vsm:flex-row mt-4 flex w-full max-w-[345px] flex-col gap-4 md:w-auto md:flex-col'>
						{isPending ? (
							<Skeleton className='h-[112px] w-[250px]' />
						) : (
							<Block className='flex-1'>
								<div className='flex items-start gap-2'>
									<Text />
									<p className='max-w-[200px] flex-1'>
										{data?.description?.slice(0, 100)}...
									</p>
								</div>
								<GroupMoreInfo group={data}>
									<button className='text-main mt-4 flex items-center gap-2 underline'>
										<Info /> Подробная информация
									</button>
								</GroupMoreInfo>
							</Block>
						)}
						{isPending ? (
							<Skeleton className='h-[112px] w-[250px]' />
						) : (
							data.followers &&
							data?.followers?.length > 0 && (
								<Block>
									<h5>
										Подписчики{' '}
										<span>{data?.followers?.length}</span>
									</h5>
									<div className='mt-2 flex flex-wrap gap-4'>
										{data?.followers?.map(follower => (
											<Link
												key={follower.id}
												href={`/profile/${follower.userId}`}
											>
												<Image
													src={
														follower.user?.avatar ||
														'/images/icons/no-avatar.svg'
													}
													alt='Подписчик'
													width={50}
													height={50}
													className='h-[50px] w-[50px] rounded-full object-cover'
												/>
											</Link>
										))}
									</div>
								</Block>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

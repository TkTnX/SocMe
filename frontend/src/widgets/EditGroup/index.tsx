'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGroups, usePosts, useUser } from '@/api/hooks'
import { EditGroupForm, EditGroupPhotos } from '@/features'
import { Block, ErrorMessage, Skeleton } from '@/shared/components'
import { ErrorType } from '@/shared/types'

interface Props {
	groupId: string
}

export const EditGroup = ({ groupId }: Props) => {
	const { getGroupByIdQuery } = useGroups()
	const { user, isUserPending } = useUser()
	const router = useRouter()

	useEffect(() => {
		if (user && !user.groups.find(group => group.id === groupId)) {
			router.push(`/groups/${groupId}`)
		}
	}, [user])

	const { data, isPending, error } = getGroupByIdQuery(groupId)

	if (isUserPending || isPending)
		return <Skeleton className='h-[500px] w-full' />

	if (error) return <ErrorMessage error={error as ErrorType} />
	return (
		<Block className='flex w-full flex-col gap-4'>
			<h2 className='text-4xl font-bold text-black'>{data.name}</h2>
            <EditGroupPhotos group={data} isPending={isPending} />
            <EditGroupForm group={data} />
		</Block>
	)
}

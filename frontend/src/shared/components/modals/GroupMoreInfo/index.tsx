import { House, Monitor, PanelTop, Phone, Text, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { IGroup } from '@/api/types'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/shared/components/ui'

interface Props {
	children: React.ReactNode
	group: IGroup
}

export const GroupMoreInfo = ({ children, group }: Props) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Подробная информация</AlertDialogTitle>
					<AlertDialogCancel className='text-main absolute right-4 border-0'>
						<X />
					</AlertDialogCancel>
				</AlertDialogHeader>
				<div className='flex flex-col gap-5'>
					{group.type && (
						<div className='flex items-start gap-2'>
							<Monitor className='text-main' />
							<p className='flex-1'> {group.type}</p>
						</div>
					)}
					{group.description && (
						<div className='flex items-start gap-2'>
							<Text className='text-main' />
							<p className='flex-1'> {group.description}</p>
						</div>
					)}
					{group.address && (
						<div className='flex items-start gap-2'>
							<House className='text-main' />
							<p className='flex-1'> {group.address}</p>
						</div>
					)}

					{group.phone && (
						<div className='flex items-start gap-2'>
							<Phone className='text-main' />
							<Link
								href={`tel:${group.phone}`}
								className='flex-1 underline'
							>
								{' '}
								{group.phone}
							</Link>
						</div>
					)}

					{group.website && (
						<div className='flex items-start gap-2'>
							<PanelTop className='text-main' />
							<a
								href={group.website}
								className='flex-1 underline'
							>
								{' '}
								{group.website}
							</a>
						</div>
					)}

					<div>
						<h5>Администрация</h5>
						<div className='mt-4 flex flex-wrap items-center gap-4'>
							{group.admins?.map(admin => (
								<Link
									key={admin.id}
									href={`/profile/${admin.id}`}
								>
									<Image
										alt={admin.name}
										src={
											admin.avatar ||
											'/images/icons/no-avatar.svg'
										}
										width={40}
										height={40}
										className='max-h-[40px] max-w-[40px] rounded-full object-cover'
									/>
								</Link>
							))}
						</div>
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	)
}

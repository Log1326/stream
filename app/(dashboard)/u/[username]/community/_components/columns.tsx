'use client'

import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { GetBlockedAllUsersType } from '@/lib/types'
import { IconMemo } from '@/components/Icon'
import { UnblockButton } from './unblock-button'
import { UserAvatar } from '@/components/user-avatar'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<GetBlockedAllUsersType>[] = [
	{
		accessorKey: 'username',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				<span className='mr-2'>Username</span>
				<IconMemo IconView={ArrowUpDown} />
			</Button>
		),
		cell: ({ row }) => (
			<div className='flex gap-x-4 items-center'>
				<UserAvatar
					imageUrl={row.original.blocked.imageUrl}
					username={row.original.blocked.username}
				/>
				<span>{row.original.blocked.username}</span>
			</div>
		)
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<Button
				variant='ghost'
				onClick={() =>
					column.toggleSorting(column.getIsSorted() === 'asc')
				}
			>
				<span className='mr-2'>Data blocked</span>
				<IconMemo IconView={ArrowUpDown} />
			</Button>
		)
	},
	{
		id: 'Actions',
		cell: ({ row }) => <UnblockButton userId={row.original.blocked.id} />
	}
]

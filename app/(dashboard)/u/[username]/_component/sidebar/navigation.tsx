'use client'

import {
	Fullscreen,
	KeyRound,
	LucideIcon,
	MessageSquare,
	Users
} from 'lucide-react'
import { NavItem, NavItemSkeleton } from './nav-item'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export type TypeRoutes = {
	label: string
	href: string
	icon: LucideIcon
}
export const Navigation = () => {
	const pathname = usePathname()
	const { user } = useUser()
	const routes: TypeRoutes[] = useMemo(
		() => [
			{
				label: 'Stream',
				href: `/u/${user?.username}`,
				icon: Fullscreen
			},
			{
				label: 'Keys',
				href: `/u/${user?.username}/keys`,
				icon: KeyRound
			},
			{
				label: 'Chat',
				href: `/u/${user?.username}/chat`,
				icon: MessageSquare
			},
			{
				label: 'Community',
				href: `/u/${user?.username}/community`,
				icon: Users
			}
		],
		[user?.username]
	)
	if (!user?.username)
		return (
			<ul className='space-y-2'>
				{[...Array(4)].map((_, i) => (
					<NavItemSkeleton key={i} />
				))}
			</ul>
		)
	return (
		<ul className='space-y-2 px-2 pt-4 lg:pt-0'>
			{routes.map(route => (
				<NavItem
					key={route.href}
					data={route}
					isActive={pathname === route.href}
				/>
			))}
		</ul>
	)
}

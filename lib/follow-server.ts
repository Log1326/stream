import { Follow, User } from '@prisma/client'

import { db } from './db'
import { getAuth } from './auth-service'

export const followService = {
	async isFollowingUser(id: string): Promise<boolean> {
		try {
			const user = await getAuth()
			const anotherUser = await db.user.findUnique({ where: { id } })
			if (!anotherUser) throw new Error('User not found')
			if (anotherUser.id === user.id) return true
			const isFollow = await db.follow.findFirst({
				where: { followerId: user.id, followingId: anotherUser.id }
			})
			return !!isFollow
		} catch (error) {
			return false
		}
	},
	async followUser(
		id: string
	): Promise<Follow & { following: User; follower: User }> {
		const user = await getAuth()
		const anotherUser = await db.user.findUnique({ where: { id } })
		if (!anotherUser) throw new Error('User not found')
		if (anotherUser.id === user.id)
			throw new Error('Cannot follow yourself')
		const existingFollow = await db.follow.findFirst({
			where: { followerId: user.id, followingId: anotherUser.id }
		})
		if (existingFollow) throw new Error('Already following')
		const follow = await db.follow.create({
			data: { followerId: user.id, followingId: anotherUser.id },
			include: { follower: true, following: true }
		})
		return follow
	}
}

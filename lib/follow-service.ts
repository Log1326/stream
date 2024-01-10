import { Follow, User } from '@prisma/client'

import { db } from './db'
import { getAuth } from './auth-service'

async function _findUniqueById(id: string): Promise<{
	user: User
	anotherUser: User
	existingFollow: Follow | null
}> {
	const user = await getAuth()
	const anotherUser = await db.user.findUnique({ where: { id } })
	if (!anotherUser) throw new Error('User not found')
	const existingFollow = await db.follow.findFirst({
		where: { followerId: user.id, followingId: anotherUser.id }
	})
	return { user, anotherUser, existingFollow }
}
export const followService = {
	async isFollowingUser(id: string): Promise<boolean> {
		try {
			const { anotherUser, user, existingFollow } =
				await _findUniqueById(id)
			if (anotherUser.id === user.id) return true
			return Boolean(existingFollow)
		} catch (error) {
			return false
		}
	},
	async followUser(
		id: string
	): Promise<Follow & { following: User; follower: User }> {
		const { anotherUser, user, existingFollow } = await _findUniqueById(id)
		if (anotherUser.id === user.id)
			throw new Error('Cannot follow yourself')
		if (existingFollow) throw new Error('Already following')
		return db.follow.create({
			data: { followerId: user.id, followingId: anotherUser.id },
			include: { follower: true, following: true }
		})
	},
	async unFollowUser(id: string): Promise<Follow & { following: User }> {
		const { anotherUser, user, existingFollow } = await _findUniqueById(id)
		if (anotherUser.id === user.id)
			throw new Error('Cannot follow yourself')
		if (!existingFollow) throw new Error('Not following')
		return db.follow.delete({
			where: { id: existingFollow.id },
			include: { following: true }
		})
	},
	async getFollowedUser(): Promise<(Follow & { following: User })[] | []> {
		try {
			const user = await getAuth()
			return db.follow.findMany({
				where: {
					followerId: user.id,
					following: { blocking: { none: { blockedId: user.id } } }
				},
				include: { following: true }
			})
		} catch (error) {
			return []
		}
	}
}

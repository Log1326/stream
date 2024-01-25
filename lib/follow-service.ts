import {
	FollowType,
	FollowerUserType,
	GetFollowUserType,
	UserFieldsType
} from './types'

import { authService } from './auth-service'
import { db } from './db'

async function _findUniqueById(id: string): Promise<{
	user: UserFieldsType
	anotherUser: UserFieldsType
	existingFollow: FollowType
}> {
	const user = await authService.getAuth()
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
	async followUser(id: string): Promise<FollowerUserType> {
		const { anotherUser, user, existingFollow } = await _findUniqueById(id)
		if (anotherUser.id === user.id)
			throw new Error('Cannot follow yourself')
		if (existingFollow) throw new Error('Already following')
		return db.follow.create({
			data: { followerId: user.id, followingId: anotherUser.id },
			select: {
				following: { select: { username: true } },
				followerId: true,
				followingId: true
			}
		})
	},
	async unFollowUser(id: string): Promise<FollowerUserType> {
		const { anotherUser, user, existingFollow } = await _findUniqueById(id)
		if (anotherUser.id === user.id)
			throw new Error('Cannot follow yourself')
		if (!existingFollow) throw new Error('Not following')
		return db.follow.delete({
			where: { id: existingFollow.id },
			include: { following: true }
		})
	},
	async getFollowedUser(): Promise<GetFollowUserType[]> {
		try {
			const user = await authService.getAuth()
			return db.follow.findMany({
				where: {
					followerId: user.id,
					following: { blocking: { none: { blockedId: user.id } } }
				},
				select: {
					following: {
						select: {
							stream: { select: { isLive: true } },
							id: true,
							username: true,
							bio: true,
							imageUrl: true,
							externalUserId:true
						}
					}
				}
			})
		} catch (error) {
			return []
		}
	}
}

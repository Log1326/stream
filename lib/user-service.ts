import { GetUserByIdType, SelectedUserServiceType } from './types'

import { db } from './db'

const selectUser = {
	username: true,
	id: true,
	imageUrl: true,
	bio: true,
	externalUserId: true,
	stream: {
		select: {
			name: true,
			thumbnailUrl: true,
			isChatEnabled: true,
			isChatDelayed: true,
			isChatFollowersOnly: true
		}
	},
	_count: { select: { followedBy: true } }
}
export const userService = {
	async getUserByUsername(
		username: string
	): Promise<SelectedUserServiceType> {
		return db.user.findUnique({
			where: { username },
			select: selectUser
		})
	},
	async getUserById(id: string): Promise<GetUserByIdType> {
		return db.user.findUnique({
			where: { id },
			select: {
				stream: { select: { isLive: true } },
				id: true,
				username: true,
				bio: true,
				imageUrl: true,
				externalUserId: true
			}
		})
	}
}

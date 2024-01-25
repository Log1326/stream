import { GetStreamByUserIdType, StreamsTypes } from './types'

import { db } from './db'

export const streamService = {
	async getStreamByUserId(userId: string): Promise<GetStreamByUserIdType> {
		const stream = await db.stream.findUnique({
			where: { userId },
			select: {
				id: true,
				serverUrl: true,
				streamKey: true,
				isChatEnabled: true,
				isChatDelayed: true,
				isChatFollowersOnly: true
			}
		})
		if (!userId) throw new Error('User id not found')
		if (!stream) throw new Error('Stream not found')
		return stream
	},
	async getStreams(): Promise<StreamsTypes[]> {
		return db.stream.findMany({
			select: {
				isLive: true,
				name: true,
				thumbnailUrl: true,
				id: true,
				user: { select: { username: true, imageUrl: true } }
			},
			orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }]
		})
	},
	async getStreamsByUserIdAndNotBlocked(
		userId: string
	): Promise<StreamsTypes[]> {
		return db.stream.findMany({
			where: {
				user: { NOT: { blocking: { some: { blockedId: userId } } } }
			},
			select: {
				isLive: true,
				name: true,
				thumbnailUrl: true,
				id: true,
				user: { select: { username: true, imageUrl: true } }
			},
			orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }]
		})
	}
}

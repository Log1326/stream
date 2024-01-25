import { RecommendedType } from './types'
import { authService } from './auth-service'
import { db } from './db'

export const getRecommended = async (): Promise<RecommendedType[]> => {
	let userId
	try {
		userId = (await authService.getAuth()).id
	} catch (error) {
		userId = null
	}
	if (userId)
		return db.user.findMany({
			where: {
				AND: [
					{ NOT: { id: userId } },
					{ NOT: { followedBy: { some: { followerId: userId } } } },
					{ NOT: { blocking: { some: { blockedId: userId } } } }
				]
			},
			select: {
				id: true,
				bio: true,
				imageUrl: true,
				username: true,
				externalUserId: true,
				stream: { select: { isLive: true } }
			},
			orderBy: { createdAt: 'desc' }
		})
	else
		return db.user.findMany({
			orderBy: { createdAt: 'desc' },
			select: {
				id: true,
				bio: true,
				imageUrl: true,
				username: true,
				externalUserId: true,
				stream: { select: { isLive: true } }
			}
		})
}

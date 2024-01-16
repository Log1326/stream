import { Stream, User } from '@prisma/client'

import { db } from './db'
import { getAuth } from './auth-service'

export const getRecommended = async (): Promise<
	(User & { stream: Pick<Stream, 'isLive'> | null })[]
> => {
	let userId
	try {
		const userAuth = await getAuth()
		userId = userAuth.id
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
			include: { stream: { select: { isLive: true } } },
			orderBy: { createdAt: 'desc' }
		})
	else
		return db.user.findMany({
			orderBy: { createdAt: 'desc' },
			include: { stream: { select: { isLive: true } } }
		})
}

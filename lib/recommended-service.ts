import { Stream, User } from '@prisma/client'

import { authService } from './auth-service'
import { db } from './db'

export const getRecommended = async (): Promise<
	Additional<User & { stream: Nullable<Pick<Stream, 'isLive'>> }>[]
> => {
	let userId
	try {
		const userAuth = await authService.getAuth()
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

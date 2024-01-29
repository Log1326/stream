import { SearchGetResults } from './types'
import { authService } from './auth-service'
import { db } from './db'

const getStreamSearch = {
	id: true,
	thumbnailUrl: true,
	isLive: true,
	name:true,
	updatedAt:true,
	user: {
		select: {
			id: true,
			username: true,
			imageUrl: true
		}
	}
}
const filterSearch = (term?: string) => [
	{ name: { contains: term } },
	{ user: { username: { contains: term } } }
]

export const searchService = {
	async getSearchResult(term?: string): Promise<SearchGetResults[]> {
		let userId: string | undefined,
			streams: SearchGetResults[] = []
		try {
			userId = (await authService.getAuth()).id
		} catch {}
		if (userId)
			streams = await db.stream.findMany({
				where: {
					user: {
						NOT: { blocking: { some: { blockedId: userId } } }
					},
					OR: filterSearch(term)
				},
				select: getStreamSearch,
				orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }]
			})
		else
			streams = await db.stream.findMany({
				where: {
					OR: filterSearch(term)
				},
				select: getStreamSearch,
				orderBy: [{ isLive: 'desc' }, { updatedAt: 'desc' }]
			})
		return streams
	}
}

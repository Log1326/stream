import { db } from './db'
import { getAuth } from './auth-service'

export const getRecommended = async () => {
	let userId
	try {
		const userAuth = await getAuth()
		userId = userAuth.id
	} catch (error) {
		userId = null
	}
	if (userId)
		return db.user.findMany({
			where: { NOT: { id: userId } },
			orderBy: { createdAt: 'desc' }
		})
	else return db.user.findMany({ orderBy: { createdAt: 'desc' } })
}

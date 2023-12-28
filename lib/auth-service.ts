import { currentUser } from '@clerk/nextjs'
import { db } from './db'

export const getAuth = async () => {
	const auth = await currentUser()
	if (!auth || !auth.username) throw new Error('Unauthorized')
	const user = await db.user.findFirst({ where: { externalUserId: auth.id } })
	if (!user?.id) throw new Error('Not found user')
	return user
}

import { UserFieldsType } from './types'
import { currentUser } from '@clerk/nextjs'
import { db } from './db'

export const authService = {
	async getAuth(): Promise<UserFieldsType> {
		const auth = await currentUser()
		if (!auth || !auth.username) throw new Error('Unauthorized')
		const user = await db.user.findFirst({
			where: { externalUserId: auth.id },
			select: { id: true, username: true, bio: true, imageUrl: true,externalUserId:true }
		})
		if (!user?.id) throw new Error('Not found user')
		return user
	},
	async getAuthUserByUsername(username: string): Promise<Boolean> {
		const authUser = await currentUser()
		if (!username) throw new Error('There is no username')
		if (!authUser || !authUser.username) throw new Error('Unauthorized')
		const userDB = await db.user.findUnique({ where: { username } })
		if (!userDB) throw new Error('User not found')
		if (authUser.username !== userDB.username)
			throw new Error('Unauthorized')
		return Boolean(userDB)
	}
}

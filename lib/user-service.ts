import { User } from '@prisma/client'
import { db } from './db'

export const getUserByUsername = async (
	username: string
): Promise<User | null> => {
	const user = await db.user.findUnique({
		where: { username }
	})
	return user
}

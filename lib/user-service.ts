import { Stream, User } from '@prisma/client'

import { db } from './db'

export const userService = {
	async getUserByUsername(
		username: string
	): Promise<Nullable<Additional<User & { stream: Nullable<Stream> }>>> {
		const user = await db.user.findUnique({
			where: { username },
			include: {
				stream: true
			}
		})
		return user
	},
	async getUserById(
		id: string
	): Promise<Nullable<User & { stream: Nullable<Stream> }>> {
		return db.user.findUnique({
			where: { id },
			include: { stream: true }
		})
	}
}

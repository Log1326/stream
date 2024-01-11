import { Stream } from '@prisma/client'
import { db } from './db'

export const streamService = {
	async getStreamByUserId(userId: string): Promise<Stream | null> {
		return db.stream.findUnique({ where: { userId } })
	}
}

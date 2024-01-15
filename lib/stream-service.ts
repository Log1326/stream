import { Stream } from '@prisma/client'
import { db } from './db'

export const streamService = {
	async getStreamByUserId(userId: string): Promise<Stream | null> {
		const stream = await db.stream.findUnique({ where: { userId } })
		if (!userId) throw new Error('User id not found')
		if (!stream) throw new Error('Stream not found')
		return stream
	}
}

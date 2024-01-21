'use server'

import { Stream } from '@prisma/client'
import { authService } from '@/lib/auth-service'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { streamService } from '@/lib/stream-service'

export const updateStream = async (
	values: Partial<Stream>
): Promise<Stream> => {
	try {
		const userAuth = await authService.getAuth()
		const streamFromDB = await streamService.getStreamByUserId(userAuth.id)
		if (!streamFromDB) throw new Error('Stream not found')
		const validData = {
			name: values.name,
			isChatEnabled: values.isChatEnabled,
			isChatFollowersOnly: values.isChatFollowersOnly,
			isChatDelayed: values.isChatDelayed
		}
		const stream = await db.stream.update({
			where: { id: streamFromDB.id },
			data: { ...validData }
		})
		revalidatePath(`/u/${userAuth.username}/chat`)
		revalidatePath(`/u/${userAuth.username}`)
		revalidatePath(`/${userAuth.username}/chat`)
		return stream
	} catch (error) {
		throw new Error('internal Error')
	}
}

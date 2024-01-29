'use server'

import { BlockedOnlyUsernameType } from '@/lib/types'
import { RoomServiceClient } from 'livekit-server-sdk'
import { authService } from '@/lib/auth-service'
import { blockService } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

const apiUrl = process.env.LIVE_KIT_URL as string
const apiKey = process.env.LIVE_KIT_API_KEY as string
const apiSecret = process.env.LIVE_KIT_API_SECRET_KEY as string

const roomService = new RoomServiceClient(apiUrl, apiKey, apiSecret)

export const onBlock = async (
	id: string
): Promise<BlockedOnlyUsernameType | undefined> => {
	const userAuth = await authService.getAuth()
	let blockUser
	try {
		blockUser = await blockService.blockUser(id)
	} catch {
		//this is a guest
	}

	try {
		await roomService.removeParticipant(userAuth.id, id)
	} catch {
		//this is a user who is not in the room
	}
	revalidatePath(`/u/${userAuth.username}/community`)
	return blockUser
}
export const onUnblock = async (
	id: string
): Promise<BlockedOnlyUsernameType> => {
	const username = (await authService.getAuth()).username
	const unblockUser = await blockService.unblockUser(id)
	revalidatePath(`/u/${username}/community`)
	return unblockUser
}

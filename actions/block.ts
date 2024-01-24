'use server'

import { Block, User } from '@prisma/client'

import { RoomServiceClient } from 'livekit-server-sdk'
import { authService } from '@/lib/auth-service'
import { blockService } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

type BlockedResponse = (Block & { blocked: User }) | undefined

const apiUrl = process.env.LIVE_KIT_URL as string
const apiKey = process.env.LIVE_KIT_API_KEY as string
const apiSecret = process.env.LIVE_KIT_API_SECRET_KEY as string

const roomService = new RoomServiceClient(apiUrl, apiKey, apiSecret)

export const onBlock = async (id: string): Promise<BlockedResponse> => {
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
export const onUnblock = async (id: string): Promise<BlockedResponse> => {
	const unblockUser = await blockService.unblockUser(id)
	revalidatePath('/')
	if (unblockUser) revalidatePath(`/${unblockUser.blocked.username}`)
	return unblockUser
}

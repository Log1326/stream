'use server'

import { Block, User } from '@prisma/client'

import { blockService } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

type BlockedResponse = Block & { blocked: User }

export const onBlock = async (id: string): Promise<BlockedResponse> => {
	//TODO: Adapt to disconnect  from livestream
	//TODO: Allow ability  to kick the guest
	const blockUser = await blockService.blockUser(id)
	revalidatePath('/')
	if (blockUser) revalidatePath(`/${blockUser.blocked.username}`)
	return blockUser
}
export const onUnblock = async (id: string): Promise<BlockedResponse> => {
	const unblockUser = await blockService.unblockUser(id)
	revalidatePath('/')
	if (unblockUser) revalidatePath(`/${unblockUser.blocked.username}`)
	return unblockUser
}

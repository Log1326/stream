'use server'

import { blockService } from '@/lib/block-service'
import { revalidatePath } from 'next/cache'

export const onBlock = async (id: string) => {
	//TODO: Adapt to disconnect  from livestream
	//TODO: Allow ability  to kick the guest
	const blockUser = await blockService.blockUser(id)
	revalidatePath('/')
	if (blockUser) revalidatePath(`/${blockUser.blocked.username}`)
	return blockUser
}
export const onUnblock = async (id: string) => {
	const unblockUser = await blockService.unblockUser(id)
	revalidatePath('/')
	if (unblockUser) revalidatePath(`/${unblockUser.blocked.username}`)
	return unblockUser
}

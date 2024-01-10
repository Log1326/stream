import { Block, User } from '@prisma/client'

import { db } from './db'
import { getAuth } from './auth-service'

type BlockedResponse = Block & { blocked: User }

async function _getBlockData(
	id: string
): Promise<{ userAuth: User; userDB: User }> {
	const userAuth = await getAuth()
	const userDB = await db.user.findUnique({
		where: { id }
	})
	if (!userDB) throw new Error('User not found')
	return { userAuth, userDB }
}
export const blockService = {
	async isBlockedByUser(id: string): Promise<boolean> {
		try {
			const { userAuth, userDB } = await _getBlockData(id)
			if (userDB.id === userAuth.id) return false
			return Boolean(
				db.block.findUnique({
					where: {
						blockerId_blockedId: {
							blockerId: userDB.id,
							blockedId: userAuth.id
						}
					}
				})
			)
		} catch (error) {
			return false
		}
	},
	async blockUser(id: string): Promise<BlockedResponse> {
		const { userAuth, userDB } = await _getBlockData(id)
		if (userAuth.id === id) throw new Error('Cannot block yourself')
		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: userAuth.id,
					blockedId: userDB.id
				}
			}
		})
		if (existingBlock) throw new Error('Already blocked')
		return db.block.create({
			data: { blockerId: userAuth.id, blockedId: userDB.id },
			include: { blocked: true }
		})
	},
	async unblockUser(id: string): Promise<BlockedResponse> {
		const { userAuth, userDB } = await _getBlockData(id)
		if (userAuth.id === id) throw new Error('Cannot unblock yourself')
		const existingBlock = await db.block.findUnique({
			where: {
				blockerId_blockedId: {
					blockerId: userAuth.id,
					blockedId: userDB.id
				}
			}
		})
		if (!existingBlock) throw new Error('Not blocked')
		return db.block.delete({
			where: { id: existingBlock.id },
			include: { blocked: true }
		})
	}
}

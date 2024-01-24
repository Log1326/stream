'use server'

import { AccessToken } from 'livekit-server-sdk'
import { authService } from '@/lib/auth-service'
import { blockService } from '@/lib/block-service'
import { userService } from '@/lib/user-service'
import { v4 } from 'uuid'

export const createViewerToken = async (
	hostIdentity: string
): Promise<string> => {
	let user
	try {
		user = await authService.getAuth()
	} catch (error) {
		const id = v4()
		const username = `guest#${Math.floor(Math.random() * 1000)}`
		user = { id, username }
	}
	const host = await userService.getUserById(hostIdentity)

	if (!host) throw new Error('User not found')
	const isBlocked = await blockService.isBlockedByUser(host.id)
	if (isBlocked) throw new Error('User is blocker')
	const isHost = user.id === host.id
	const apiKey = process.env.LIVE_KIT_API_KEY as string
	const apiSecret = process.env.LIVE_KIT_API_SECRET_KEY as string

	const token = new AccessToken(apiKey, apiSecret, {
		identity: isHost ? `host-${user.id}` : user.id,
		name: user.username
	})
	token.addGrant({
		room: host.id,
		roomJoin: true,
		canPublish: false,
		canPublishData: true
	})
	return Promise.resolve(token.toJwt())
}

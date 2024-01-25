'use server'

import { FollowerUserType } from '@/lib/types'
import { followService } from '@/lib/follow-service'
import { revalidatePath } from 'next/cache'

export async function onFollow(id: string): Promise<FollowerUserType> {
	try {
		const followedUser = await followService.followUser(id)
		revalidatePath('/')
		if (followedUser) revalidatePath(`/${followedUser.following.username}`)
		return followedUser
	} catch (error) {
		console.log(error)
		throw new Error('Internal Error')
	}
}
export async function onUnFollowed(id: string): Promise<FollowerUserType> {
	try {
		const unFollowedUser = await followService.unFollowUser(id)
		revalidatePath('/')
		if (unFollowedUser)
			revalidatePath(`/${unFollowedUser.following.username}`)
		return unFollowedUser
	} catch (error) {
		throw new Error('Internal Error')
	}
}

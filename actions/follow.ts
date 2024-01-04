'use server'

import { followService } from '@/lib/follow-server'
import { revalidatePath } from 'next/cache'

export const onFollow = async (id: string) => {
	try {
		const followedUser = await followService.followUser(id)
		console.log(followedUser)
		revalidatePath('/')
		if (followedUser) revalidatePath(`/${followedUser.following.username}`)
		return followedUser
	} catch (error) {
		throw new Error('Interal Error')
	}
}

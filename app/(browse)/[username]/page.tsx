import { StreamPlayer } from '@/components/stream-player'
import { blockService } from '@/lib/block-service'
import { followService } from '@/lib/follow-service'
import { notFound } from 'next/navigation'
import { userService } from '@/lib/user-service'

type Params = {
	params: { username: string }
}
export default async function PageUsername({ params: { username } }: Params) {
	const user = await userService.getUserByUsername(username)	
	if (!user || !user.stream) notFound()
	const isFollowing = await followService.isFollowingUser(user.id)
	const isBLocked = await blockService.isBlockedByUser(user.id)
	if (isBLocked) notFound()
	return <StreamPlayer user={user} isFollowing={isFollowing} />
}

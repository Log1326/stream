import { Actions } from './_components/actions'
import { blockService } from '@/lib/block-service'
import { followService } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'

type Params = {
	params: { username: string }
}
export default async function PageUsername({ params: { username } }: Params) {
	const user = await getUserByUsername(username)
	if (!user) notFound()
	const isFollowing = await followService.isFollowingUser(user.id)
	const isBlock = await blockService.isBlockedByUser(user.id)
	return (
		<div className='flex flex-col gap-y-4 w-full'>
			<p>{user.id}</p>
			<p>{user.username}</p>
			<p>{`isFollowing:${isFollowing}`}</p>
			<p>{`isBlock:${isBlock}`}</p>
			<Actions isFollowing={isFollowing} userId={user.id} />
		</div>
	)
}

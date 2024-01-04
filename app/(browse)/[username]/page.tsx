import { Actions } from './_components/actions'
import { followService } from '@/lib/follow-server'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'

type Params = {
	params: { username: string }
}
export default async function PageUsername({ params: { username } }: Params) {
	const user = await getUserByUsername(username)
	if (!user) notFound()
	const isFollowing = await followService.isFollowingUser(user.id)
	return (
		<div className='flex flex-col gap-y-4 w-full'>
			<p>{user.id}</p>
			<p>{user.username}</p>
			<p>{`${isFollowing}`}</p>
			<Actions isFollowing={isFollowing} userId={user.id} />
		</div>
	)
}

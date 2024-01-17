import { StreamPlayer } from '@/components/stream-player'
import { currentUser } from '@clerk/nextjs'
import { userService } from '@/lib/user-service'

type Params = { params: { username: string } }

export default async function PageHomeInnerDashboard({
	params: { username }
}: Params) {
	const externalUser = await currentUser()
	const userFromDB = await userService.getUserByUsername(username)
	const isChecked =
		!userFromDB ||
		userFromDB.externalUserId !== externalUser?.id ||
		!userFromDB.stream
	if (isChecked) throw new Error('Unauthorized')
	return (
		<div className='h-full'>
			<StreamPlayer
				user={userFromDB}
				stream={userFromDB.stream}
				isFollowing
			/>
		</div>
	)
}

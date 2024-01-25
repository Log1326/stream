import { StreamsTypes } from './types'
import { authService } from './auth-service'
import { streamService } from './stream-service'

export const getStreams = async (): Promise<StreamsTypes[]> => {
	let userId: string | null,
		streams: StreamsTypes[] = []
	try {
		const userAuth = await authService.getAuth()
		userId = userAuth.id
	} catch {
		userId = null
	}
	if (userId)
		streams = await streamService.getStreamsByUserIdAndNotBlocked(userId)
	else streams = await streamService.getStreams()
	return streams
}

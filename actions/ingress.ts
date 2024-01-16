'use server'

import {
	type IngressInfo,
	CreateIngressOptions,
	IngressAudioEncodingPreset,
	IngressClient,
	IngressInput,
	IngressVideoEncodingPreset,
	RoomServiceClient
} from 'livekit-server-sdk'

import { TrackSource } from 'livekit-server-sdk/dist/proto/livekit_models'
import { db } from '@/lib/db'
import { getAuth } from '@/lib/auth-service'
import { revalidatePath } from 'next/cache'

const apiUrl = process.env.LIVE_KIT_URL as string
const apiKey = process.env.LIVE_KIT_API_KEY as string
const apiSecret = process.env.LIVE_KIT_API_SECRET_KEY as string

const roomService = new RoomServiceClient(apiUrl, apiKey, apiSecret)
const ingressClient = new IngressClient(apiUrl, apiKey, apiSecret)

export const resetIngress = async (hostIdentity: string): Promise<void> => {
	const ingresses = await ingressClient.listIngress({
		roomName: hostIdentity
	})

	const rooms = await roomService.listRooms([hostIdentity])

	for (const room of rooms) {
		await roomService.deleteRoom(room.name)
	}

	for (const ingress of ingresses) {
		if (ingress.ingressId)
			await ingressClient.deleteIngress(ingress.ingressId)
	}
}
export const createIngress = async (
	ingressType: IngressInput
): Promise<IngressInfo> => {
	const userAuth = await getAuth()

	await resetIngress(userAuth.id)

	const options: CreateIngressOptions = {
		name: userAuth.username,
		roomName: userAuth.id,
		participantName: userAuth.username,
		participantIdentity: userAuth.id
	}

	if (ingressType === IngressInput.WHIP_INPUT)
		options.bypassTranscoding = true
	else {
		options.video = {
			source: TrackSource.CAMERA,
			preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
		}
		options.audio = {
			source: TrackSource.MICROPHONE,
			preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
		}
	}

	const ingress = await ingressClient.createIngress(ingressType, options)
	if (!ingress || !ingress.url || !ingress.streamKey)
		throw new Error('Failed to create ingress')

	await db.stream.update({
		where: { userId: userAuth.id },
		data: {
			ingressId: ingress.ingressId,
			serverUrl: ingress.url,
			streamKey: ingress.streamKey
		}
	})

	revalidatePath(`/u/${userAuth.username}/keys`)

	return ingress
}

import { WebhookReceiver } from 'livekit-server-sdk'
import { db } from '@/lib/db'
import { headers } from 'next/headers'

const apiKey = process.env.LIVE_KIT_API_KEY as string
const apiSecret = process.env.LIVE_KIT_API_SECRET_KEY as string

const receiver = new WebhookReceiver(apiKey, apiSecret)

export async function POST(req: Request) {
	const body = await req.text()
	const headerPayload = headers()
	const authorization = headerPayload.get('Authorization')
	if (!authorization)
		return new Response('No authorization header', { status: 400 })
	const event = receiver.receive(body, authorization)
	if (event.event === 'ingress_started')
		await db.stream.update({
			where: { ingressId: event.ingressInfo?.ingressId },
			data: { isLive: true }
		})
	if (event.event === 'ingress_ended')
		await db.stream.update({
			where: { ingressId: event.ingressInfo?.ingressId },
			data: { isLive: false }
		})
}

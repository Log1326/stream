import { JwtPayload, jwtDecode } from 'jwt-decode'
import { useEffect, useMemo, useState } from 'react'

import { createViewerToken } from '@/actions/token'
import { toast } from 'sonner'

type UseViewerTokenType = {
	token: string
	name: string
	identity: string
	isLoading: boolean
	isPending: boolean
}

export const useViewerToken = (hostIdentity: string): UseViewerTokenType => {
	const [token, setToken] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [identity, setIdentity] = useState<string>('')
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		setIsLoading(true)
		const createToken = async () => {
			try {
				const viewerToken = await createViewerToken(hostIdentity)
				setToken(viewerToken)
				const decodeToken: JwtPayload & { name?: string } =
						jwtDecode(viewerToken),
					nameToken = decodeToken?.name,
					identityToken = decodeToken.jti
				if (nameToken) setName(nameToken)
				if (identityToken) setIdentity(identityToken)
			} catch (error) {
				toast.error('Something went wrong')
			} finally {
				setIsLoading(false)
			}
		}
		createToken()
	}, [hostIdentity])
	const isPending = !token || !name || !identity
	return useMemo(
		() => ({ token, name, identity, isLoading, isPending }),
		[identity, isPending, isLoading, name, token]
	)
}

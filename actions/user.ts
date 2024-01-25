'use server'

import { User } from '@prisma/client'
import { authService } from '@/lib/auth-service'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const updateUser = async (
	values: Partial<Pick<User, 'bio'>>
): Promise<void> => {
	const userAuth = await authService.getAuth()
	const validData = {
		bio: values.bio
	}
	await db.user.update({
		where: { id: userAuth.id },
		data: { ...validData }
	})
	revalidatePath(`/${userAuth.username}`)
	revalidatePath(`/u/${userAuth.username}`)
}

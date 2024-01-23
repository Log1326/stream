import { authService } from '@/lib/auth-service'
import { db } from '@/lib/db'
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const fn = createUploadthing()

export const ourFileRouter = {
	thumbnailUploader: fn({
		image: { maxFileSize: '4MB', maxFileCount: 1 }
	})
		.middleware(async () => {
			return { userId: (await authService.getAuth()).id }
		})
		.onUploadComplete(async ({ metadata, file }) => {
			await db.stream.update({
				where: { userId: metadata.userId },
				data: { thumbnailUrl: file.url }
			})
			return { fileUrl: file.url }
		})
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter

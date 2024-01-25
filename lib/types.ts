import { Block, Follow, Stream, User } from '@prisma/client'

//common
export type UserFieldsType = Pick<
	User,
	'id' | 'bio' | 'imageUrl' | 'username' | 'externalUserId'
>

export type StreamFieldsType = Pick<
	Stream,
	| 'name'
	| 'thumbnailUrl'
	| 'isChatEnabled'
	| 'isChatDelayed'
	| 'isChatFollowersOnly'
>

//user service
export type SelectedUserServiceType = Nullable<
	Additional<
		UserFieldsType & {
			stream: Nullable<StreamFieldsType>
			_count: { followedBy: number }
		}
	>
>
export type GetUserByIdType = Nullable<
	UserFieldsType & { stream: Nullable<Pick<Stream, 'isLive'>> }
>

//block service
export type BlockedResponse = Block & { blocked: User }
export type BlockedOnlyUsernameType = {
	blockerId: string
	blockedId: string
} & { blocked: Pick<User, 'username'> }

//follow service
export type FollowerUserType = Pick<Follow, 'followerId' | 'followingId'> & {
	following: Pick<User, 'username'>
}
export type GetFollowUserType = {
	following: UserFieldsType & {
		stream: Nullable<Pick<Stream, 'isLive'>>
	}
}
export type FollowType = Nullable<Follow>

//recommended service
export type RecommendedType = UserFieldsType & {
	stream: Nullable<Pick<Stream, 'isLive'>>
}
//stream service
export type GetStreamByUserIdType = Nullable<
	Pick<
		Stream,
		| 'id'
		| 'serverUrl'
		| 'streamKey'
		| 'isChatEnabled'
		| 'isChatDelayed'
		| 'isChatFollowersOnly'
	>
>
export type StreamsTypes = Additional<
	Pick<Stream, 'name' | 'isLive' | 'thumbnailUrl' | 'id'> & {
		user: Pick<User, 'username' | 'imageUrl'>
	}
>

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { zustandPersist } from '~/lib/storage'
import { auth0 } from '~/utils/auth';
import dayjs from 'dayjs';

export type ProfileData = {
	id: string;
	phoneNumber: string;
}

export type AuthData = {
	accessToken: string;
	refreshToken: string;
	idToken: string;
	expiresIn: number;
	refreshedAt: string | null;
} & ProfileData

export type AuthStore = {
	user: AuthData | null;
	refetchToken: () => Promise<string>;
}

export const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			user: null,
			refetchToken: async (): Promise<string> => {
				const { user } = get()
				if (!user) throw new Error('No user')

				const token = await auth0.auth.refreshToken({
					refreshToken: user.refreshToken,
					scope: 'openid profile email address phone offline_access'
				})

				if (!token.idToken) throw new Error('No access token')

				set({
					user: {
						...user,
						accessToken: token.accessToken,
						expiresIn: token.expiresIn,
						refreshedAt: dayjs().toISOString(),
						idToken: token.idToken
					}
				})

				return token.accessToken
			}
		}),
		{
			name: 'auth-store',
			storage: zustandPersist<AuthStore>()
		}
	)
)
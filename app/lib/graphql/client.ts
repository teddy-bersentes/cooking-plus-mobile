import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { GraphQLClient } from 'graphql-request'
import { useAuthStore } from '~/lib/store/auth'
import dayjs from 'dayjs'
import Config from '~/config'
import * as Storage from '~/lib/storage'
import { APIError, isGQLError } from './errors'

const TIMEOUT = 120000

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			cacheTime: Infinity,
			refetchInterval: 1000 * 60 * 5, // 5 minutes
			retryDelay: 1500, // 1.5 seconds
			retry: 3,
			refetchOnMount: 'always',
			refetchOnWindowFocus: 'always'
		},
		mutations: {
			retry: 0
		}
	}
})

export const persister = createSyncStoragePersister({
	key: 'tanstack-query',
	storage: {
		getItem: key => Storage.load(key),
		setItem: (key, value) => Storage.save(key, value),
		removeItem: key => Storage.remove(key)
	}
})

export const apiClient = new GraphQLClient(
	Config.API_URL,
	{
		requestMiddleware: async request => {
			const { user, refetchToken } = useAuthStore.getState()
			if (!user) return request

			let token = user.accessToken

			const refreshedAt = dayjs(user.refreshedAt || new Date())
			const hasTokenExpired = dayjs().isAfter(refreshedAt.add(user.expiresIn, 'second'))
			if (hasTokenExpired) {
				token = await refetchToken()
			}

			return {
				...request,
				headers: {
					...request.headers,
					Authorization: `Bearer ${token}`
				}
			}
		},
		fetch: async (input: RequestInfo, init?: RequestInit) => {
			const controller = new AbortController()
			const timerId = setTimeout(() => controller.abort(), TIMEOUT)
			try {
				const result = await fetch(input, { ...init, signal: controller.signal })
				return result
			} catch (error) {
				throw error
			} finally {
				clearTimeout(timerId)
			}
		},
		responseMiddleware: async response => {
			if (response instanceof Error) {
				const error = response as unknown
				if (isGQLError(error)) {
					const apiError = new APIError(error)
					const { refetchToken } = useAuthStore.getState()
					if (apiError.message === 'Unauthorized') await refetchToken()
				} else {
					console.log('Unknown API Error', error)
				}
			}
			return response
		}
	}
)
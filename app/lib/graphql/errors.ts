
interface GQLErrorSegment {
	message: string
	extensions: {
		code: string
		response?: {
			statusCode: number
			message: string
			error?: string
		}
		exception?: {
			stacktrace: string[]
		}
	}
}


interface GQLErrorResponse {
	response: {
		errors?: GQLErrorSegment[]
		data: unknown | null,
		status: number,
		headers: Map<string, string>
	}
}

interface GQLErrorRequest {
	request: {
		query: string
	}
}

export type GQLError = GQLErrorResponse & GQLErrorRequest

const isType = (input: unknown, type: string): boolean => {
	return typeof input === type && input !== null
}

export const isGraphQLResponse = (input: unknown): input is GQLErrorResponse => {
	return (
		isType(input, 'object') &&
		isType((input as any).response, 'object') &&
		isType((input as any).response.errors, 'object') &&
		(isType((input as any).response.data, 'object') || (input as any).response.data === null) &&
		isType((input as any).response.status, 'number') &&
		isType((input as any).response.headers, 'object')
	)
}

export const isGraphQLRequest = (input: unknown): input is GQLErrorRequest => {
	return (
		isType(input, 'object') &&
		isType((input as any).request, 'object') &&
		isType((input as any).request.query, 'string')
	)
}

export const isGQLErrorSegment = (error: unknown): error is GQLErrorSegment => {
	return (
		isType(error, 'object') &&
		isType((error as any).message, 'string') &&
		isType((error as any).extensions, 'object') &&
		isType((error as any).extensions.code, 'string')
	)
}

export const isGQLError = (error: unknown): error is GQLError => {
	return isGraphQLResponse(error) && isGraphQLRequest(error)
}

export class APIError extends Error {
	public request: GQLErrorRequest['request']
	public response: GQLErrorResponse['response']

	public status: number

	public constructor(error: GQLError) {
		const { response, request } = error
		if (response.errors) {
			const [firstError] = response.errors
			if (firstError.extensions.response) {
				const { statusCode, message, error } = firstError.extensions.response
				super(`${statusCode} ${message}${error ? `: ${error}` : ''}`)
			} else {
				super(firstError.message)
			}
			this.status = firstError.extensions.response?.statusCode || 500
		} else {
			throw new Error('Unknown API Error')
		}
		this.name = 'APIError';
		this.stack = new Error().stack;
		this.request = request
		this.response = response
	}
}

export const isNetworkError = (error: unknown): error is TypeError => {
	return error instanceof TypeError && error.message === 'Network request failed'
}
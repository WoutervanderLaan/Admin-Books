type ENDPOINTS_POST = '/api/auth/login'

type ENDPOINTS_DELETE = '/api/auth/logout'

type ENDPOINTS_GET = '/api/auth/refresh'

type ENDPOINTS_HEAD = '/api/auth/check'

type TGetRequest = {
  endpoint: ENDPOINTS_GET
  method?: 'GET'
  body?: never
}

type TPostRequest = {
  endpoint: ENDPOINTS_POST
  method: 'POST'
  body: {
    [key: string]: any
  }
}

type TDeleteRequest = {
  endpoint: ENDPOINTS_DELETE
  method: 'DELETE'
  body?: never
}

type THeadRequest = {
  endpoint: ENDPOINTS_HEAD
  method: 'HEAD'
  body?: never
}

type TMakeRequest = {
  headers?: {
    [key: string]: string
  }
} & (TGetRequest | TPostRequest | TDeleteRequest | THeadRequest)

export const makeRequest = async <T>({
  endpoint,
  method = 'GET',
  body,
  headers = {}
}: TMakeRequest): Promise<T> => {
  const options: RequestInit = {
    method,
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers
    }
  }

  if (body) options.body = JSON.stringify(body)

  const response = await fetch(endpoint, options)

  if (method === 'HEAD') return response as T

  const payload = await response.json()

  return { status: response.status, ...payload } as T
}

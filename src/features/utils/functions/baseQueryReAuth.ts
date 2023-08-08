import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { handleExpiredSession } from './handleExpiredSession'

export const baseQueryReAuth = (_baseUrl: string) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://httpstat.us/',
  })

  const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error && result.error.status === 401) {
      handleExpiredSession()
    }
    return result
  }

  return baseQueryWithReAuth
}

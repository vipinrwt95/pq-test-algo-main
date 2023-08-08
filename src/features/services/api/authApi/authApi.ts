import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginRequest, LoginResponse, PasswordChange, User } from '../../../pages/auth/types'
import { setAuthentication, setUser } from '../../../pages/auth/authSlice'
import { toast } from 'react-toastify'
import { createSelector } from '@reduxjs/toolkit'

export const authApi = createApi({
  reducerPath: 'api',
  tagTypes: ['LoggedInUser'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URI}/v1/auth`,
    credentials: 'include',
    mode: 'cors',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['LoggedInUser'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const userData: User = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.role,
            is_active: data.is_active,
          }
          dispatch(setUser(userData))
        } catch (error: any) {
          toast('Incorrect username or password', { toastId: 'errorLogin' })
        }
      },
    }),
    isAuthenticated: builder.query<LoginResponse, void>({
      query: () => ({
        url: '/is-authenticated',
        method: 'GET',
      }),
      providesTags: ['LoggedInUser'],
      // transformResponse: (response: { data: LoginResponse }, _meta, _arg) => response.data,
      // transformErrorResponse: (response: { status: string | number }, _meta, _arg) => response.status,
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '',
        method: 'DELETE',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(setAuthentication(false))
            window.location.href = '/login'
          } else {
            toast(error.error.data.error.description)
          }
        }
      },
    }),
    getRecoveryCode: builder.mutation<{ message: string }, string>({
      query: (email: string) => ({
        url: '/recover-password',
        method: 'POST',
        credentials: 'include',
        body: email,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(setAuthentication(false))
            window.location.href = '/login'
          } else {
            toast(error.error.data.error.description)
          }
        }
      },
    }),
    changePassword: builder.mutation<{ message: string }, PasswordChange>({
      query: (body) => ({
        url: '/recover-password',
        method: 'PUT',
        credentials: 'include',
        body: body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useIsAuthenticatedQuery,
  useGetRecoveryCodeMutation,
  useChangePasswordMutation,
} = authApi

// selector for the isAuthenticated query
export const selectIsAuthenticated = authApi.endpoints.isAuthenticated.select()

export const selectIsSuperAdmin = createSelector(selectIsAuthenticated, (usersResult) => {
  return usersResult?.data?.role.id === 1
})

export const selectIsCompanyLevelUser = createSelector(selectIsAuthenticated, (usersResult) => {
  return usersResult?.data?.role.id === 3 || usersResult?.data?.role.id === 4
})

export const selectIsCenterLevelUser = createSelector(selectIsAuthenticated, (usersResult) => {
  return usersResult?.data?.role.id === 5 || usersResult?.data?.role.id === 6
})

export const selectUserData = createSelector(selectIsAuthenticated, (usersResult) => {
  return usersResult?.data
})

export const selectUsersCentersFirstCenterId = createSelector(selectIsAuthenticated, (userResult) => {
  return userResult?.data?.centers[0]?.id
})

export const selectUsersCentersFirstCenterName = createSelector(selectIsAuthenticated, (userResult) => {
  return userResult?.data?.centers[0]?.name
})

import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryReAuth } from 'src/features/utils/functions/baseQueryReAuth'
import { GetAccountResponse, UpdateAccountReqPayload } from '../accountApi/interface'
import { handleOnQueryStartedWithToast } from '../../utils/handleOnQueryStartedWithToast'

export const accountApi = createApi({
  reducerPath: 'account',
  baseQuery: baseQueryReAuth(process.env.REACT_APP_API_URI || ''),

  tagTypes: ['Account'],

  endpoints: (builder) => ({
    getAccount: builder.query<GetAccountResponse, void>({
      query: () => {
        return {
          url: process.env.REACT_APP_API_URI ? '/users/1' : `https://jsonplaceholder.typicode.com/users/1`,
        }
      },

      providesTags: ['Account'],
    }),

    updateAccount: builder.mutation<void, UpdateAccountReqPayload>({
      query: (body) => {
        return {
          url: `/500`,
          method: 'POST',
          body,
          params: {
            sleep: 300,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      },
      invalidatesTags: ['Account'],

      async onQueryStarted(_args, { queryFulfilled }) {
        handleOnQueryStartedWithToast(queryFulfilled, { action: 'update' })
      },
    }),

    changeAccountPassword: builder.mutation<
      void,
      {
        old_password: string
        password: string
        confirm_password: string
      }
    >({
      query: ({ old_password, password, confirm_password }) => {
        return {
          url: `/v1/account`,
          method: 'PATCH',
          body: {
            old_password,
            password,
            confirm_password,
          },
        }
      },

      async onQueryStarted(_args, { queryFulfilled }) {
        handleOnQueryStartedWithToast(queryFulfilled, { action: 'update' })
      },
    }),
  }),
})

export const { useGetAccountQuery, useUpdateAccountMutation, useChangeAccountPasswordMutation } = accountApi

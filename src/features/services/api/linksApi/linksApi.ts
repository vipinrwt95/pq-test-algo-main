import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {
  CreateLinkRequest,
  CreateLinkResponse,
  DeleteLinkRequest,
  GetLinkSettingsRequest,
  GetLinkSettingsResponse,
  GetLinksResponse,
  UpdateLinkOrderRequest,
  UpdateLinkRequest,
  UpdateLinkSettingsRequest,
} from './interface'
import { setAuthentication } from 'src/features/pages/auth/authSlice'

export const linksApi = createApi({
  reducerPath: 'linksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URI}/v1/links`,
    credentials: 'include',
    mode: 'cors',
  }),

  tagTypes: ['Links', 'Settings'],

  endpoints: (builder) => ({
    getLinks: builder.query<GetLinksResponse, number | undefined>({
      query: (centerId) => ({
        url: `${centerId}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'Links', id: 'LIST' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(setAuthentication(false))
            window.location.href = '/login'
          } else {
            // toast(error.error.data.error.description)
          }
        }
      },
    }),

    addLink: builder.mutation<CreateLinkResponse, CreateLinkRequest>({
      query: ({ center_id, title, link }) => ({
        url: `${center_id}`,
        method: 'POST',
        body: {
          title,
          link,
        },
      }),
      invalidatesTags: ['Links'],
    }),

    deleteLink: builder.mutation<void, DeleteLinkRequest>({
      query: ({ center_id, link_id }) => ({
        url: `${center_id}/${link_id}`,
        method: 'DELETE',
      }),

      async onQueryStarted({ center_id, link_id }, { dispatch, queryFulfilled }) {
        // silently update the cache
        const result = dispatch(
          linksApi.util.updateQueryData('getLinks', center_id, (draft) => {
            // find out deleted link index
            const index = draft?.items.findIndex((el) => el.id === link_id)

            // if the link is not found, do nothing, but this should not happen
            if (index === -1) return

            if (!draft) return

            // remove the link from the array
            draft.items.splice(index!, 1)
            draft.count -= 1
          })
        )

        try {
          await queryFulfilled
        } catch {
          result.undo()
        }
      },
    }),

    updateLink: builder.mutation<any, UpdateLinkRequest>({
      query: ({ center_id, link_id, title, link }) => ({
        url: `${center_id}/${link_id}`,
        method: 'PUT',
        body: {
          title,
          link,
        },
      }),
      invalidatesTags: ['Links'],
    }),

    getLinkSettings: builder.query<GetLinkSettingsResponse, GetLinkSettingsRequest>({
      query: ({ center_id }) => ({
        url: `${center_id}/settings`,
      }),
      providesTags: [{ type: 'Settings', id: 'SETTINGS' }],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error: any) {
          if (error.error.status === 401) {
            dispatch(setAuthentication(false))
            window.location.href = '/login'
          } else {
            // toast(error.error.data.error.description)
          }
        }
      },
    }),

    updateLinkSettings: builder.mutation<any, UpdateLinkSettingsRequest>({
      query: ({ center_id, bg_color, text_color }) => ({
        url: `${center_id}/settings`,
        method: 'PUT',
        body: {
          bg_color,
          text_color,
        },
      }),
      invalidatesTags: ['Settings'],
    }),

    updateLinkOrder: builder.mutation<any, UpdateLinkOrderRequest>({
      query: ({ center_id, items }) => ({
        url: `${center_id}/order`,
        method: 'PUT',
        body: {
          items,
        },
      }),
      // invalidatesTags: ['Links'],
    }),
  }),
})

export const {
  useGetLinksQuery,
  useAddLinkMutation,
  useDeleteLinkMutation,
  useUpdateLinkMutation,
  useGetLinkSettingsQuery,
  useLazyGetLinkSettingsQuery,
  useUpdateLinkSettingsMutation,
  useUpdateLinkOrderMutation,
} = linksApi

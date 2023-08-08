import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setAuthentication, setUser } from '../../features/pages/auth/authSlice'

export const authMiddleware = createListenerMiddleware()

authMiddleware.startListening({
  actionCreator: setAuthentication,
  effect: async (action, listenerApi) => {
    if (action.payload === true) {
      localStorage.setItem('authenticated', 'true')
    } else if (action.payload === false) {
      localStorage.setItem('authenticated', 'false')
    }
    listenerApi.cancelActiveListeners()
  },
})

authMiddleware.startListening({
  actionCreator: setUser,
  effect: async (action, _listenerApi) => {
    localStorage.setItem('userName', action.payload.first_name)
  },
})

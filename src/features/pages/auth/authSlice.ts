import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { User } from './types'

const initialState: User = {
  first_name: '',
  last_name: '',
  email: '',
  is_active: false,
  role: { id: 1, name: 'admin' },
  is_authenticated: false,
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.email = action.payload.email
      state.is_active = action.payload.is_active
      state.role = action.payload.role
      state.is_authenticated = action.payload.is_authenticated
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.is_authenticated = action.payload
    },
  },
})

export const { setUser, setAuthentication } = authSlice.actions
export default authSlice.reducer

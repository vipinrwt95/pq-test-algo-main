import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LinkSettings } from './types'

const initialState: LinkSettings = {
  bgColor: '#000000',
  textColor: '#ffffff',
}

const linkSettingsSlice = createSlice({
  name: 'linkSettingsSlice',
  initialState,
  reducers: {
    setLinkSettings: (state, action: PayloadAction<LinkSettings>) => {
      state.bgColor = action.payload.bgColor
      state.textColor = action.payload.textColor
    },
  },
})

export const { setLinkSettings } = linkSettingsSlice.actions
export default linkSettingsSlice.reducer

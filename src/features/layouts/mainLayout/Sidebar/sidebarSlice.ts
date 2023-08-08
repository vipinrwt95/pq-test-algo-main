import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MENUITEMS, MenuItems } from './Menu'

export interface SidebarState {
  mainMenu: MenuItems[]
}

const initialState: SidebarState = {
  mainMenu: MENUITEMS,
}

export const SidebarSlice = createSlice({
  name: 'SidebarSlice',
  initialState,
  reducers: {
    setMainMenu: (state, action: PayloadAction<MenuItems[]>) => {
      state.mainMenu = action.payload
    },
  },
})

export const { setMainMenu } = SidebarSlice.actions

export default SidebarSlice.reducer

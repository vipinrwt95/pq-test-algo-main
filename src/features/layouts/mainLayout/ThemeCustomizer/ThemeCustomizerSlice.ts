import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ThemeCustomizerState {
  sidebar_types: string
  settings: string
  layout: string
  mix_background_layout: string
  primaryColor: string
  secondaryColor: string
  toggleIcon: boolean
  mixLayout: boolean
  sidebarResponsive: boolean
  IsOpen: boolean
}

const sidebarSettingsFromLocalStorage = localStorage.getItem('sidebar_Settings')
const settingsFromLocalStorage = localStorage.getItem('settings')

const initialState: ThemeCustomizerState = {
  sidebar_types: sidebarSettingsFromLocalStorage ? sidebarSettingsFromLocalStorage : 'compact-wrapper',
  settings: settingsFromLocalStorage ? settingsFromLocalStorage : 'default-sidebar',
  layout: '',
  mix_background_layout: '',
  primaryColor: '',
  secondaryColor: '',
  toggleIcon: false,
  mixLayout: false,
  sidebarResponsive: false,
  IsOpen: false,
}

export const ThemeCustomizerSlice = createSlice({
  name: 'ThemeCustomizer',
  initialState,
  reducers: {
    setSideBarTypes: (state, action: PayloadAction<string>) => {
      state.sidebar_types = action.payload
    },
    setSideBarSettings: (state, action: PayloadAction<string>) => {
      state.settings = action.payload
    },
    setLayout: (state, action: PayloadAction<string>) => {
      state.layout = action.payload
    },
    setMixBackgroundLayout: (state, action: PayloadAction<string>) => {
      state.mix_background_layout = action.payload
    },
    setMixLayout: (state) => {
      state.mix_background_layout !== 'light-only' ? (state.mixLayout = false) : (state.mixLayout = true)
    },
    setToggleIcon: (state, action: PayloadAction<boolean>) => {
      state.toggleIcon = action.payload
    },
    setSideBarResponsive: (state, action: PayloadAction<boolean>) => {
      state.sidebarResponsive = action.payload
    },
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.secondaryColor = action.payload
    },
  },
})

export const {
  setSideBarTypes,
  setSideBarSettings,
  setLayout,
  setMixBackgroundLayout,
  setMixLayout,
  setToggleIcon,
  setSideBarResponsive,
  setPrimaryColor,
  setSecondaryColor,
} = ThemeCustomizerSlice.actions

export default ThemeCustomizerSlice.reducer

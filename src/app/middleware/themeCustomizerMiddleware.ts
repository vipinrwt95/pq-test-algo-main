import { createListenerMiddleware, PayloadAction } from '@reduxjs/toolkit'
import { ThemeConfigurations } from '../../features/config/ThemeConfig'
import {
  setLayout,
  setMixBackgroundLayout,
  setMixLayout,
  setPrimaryColor,
  setSecondaryColor,
  setSideBarSettings,
  setSideBarTypes,
} from '../../features/layouts/mainLayout/ThemeCustomizer/ThemeCustomizerSlice'

export const themeCustomizerMiddleware = createListenerMiddleware()

themeCustomizerMiddleware.startListening({
  actionCreator: setSideBarTypes,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.settings.sidebar.type = action.payload
    localStorage.setItem('sidebar_types', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

themeCustomizerMiddleware.startListening({
  actionCreator: setSideBarSettings,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.settings.sidebar_setting = action.payload
    localStorage.setItem('sidebar_Settings', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

themeCustomizerMiddleware.startListening({
  actionCreator: setLayout,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.settings.layout_type = action.payload
    localStorage.setItem('layout_type', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

themeCustomizerMiddleware.startListening({
  actionCreator: setMixBackgroundLayout,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.color.mix_background_layout = action.payload
    localStorage.setItem('mix_background_layout', action.payload)
    listenerApi.dispatch(setMixLayout())
    listenerApi.cancelActiveListeners()
  },
})

themeCustomizerMiddleware.startListening({
  actionCreator: setPrimaryColor,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.color.primary_color = action.payload
    localStorage.setItem('default_color', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

themeCustomizerMiddleware.startListening({
  actionCreator: setSecondaryColor,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.color.secondary_color = action.payload
    localStorage.setItem('secondary_color', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

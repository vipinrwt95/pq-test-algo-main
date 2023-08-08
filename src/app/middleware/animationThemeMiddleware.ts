import { createListenerMiddleware, PayloadAction } from '@reduxjs/toolkit'
import { ThemeConfigurations } from '../../features/config/ThemeConfig'
import { setAnimation } from '../../features/layouts/mainLayout/ThemeCustomizer/Tabs/Sidebar/AnimationFade/animationThemeSlice'

export const animationThemeMiddleware = createListenerMiddleware()

animationThemeMiddleware.startListening({
  actionCreator: setAnimation,
  effect: async (action: PayloadAction<string>, listenerApi) => {
    ThemeConfigurations.data.router_animation = action.payload
    localStorage.setItem('animation', action.payload)
    listenerApi.cancelActiveListeners()
  },
})

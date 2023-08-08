import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import AnimationThemeReducer from '../features/layouts/mainLayout/ThemeCustomizer/Tabs/Sidebar/AnimationFade/animationThemeSlice'
import ThemeCustomizerReducer from '../features/layouts/mainLayout/ThemeCustomizer/ThemeCustomizerSlice'
import { authApi } from '../features/services/api/authApi/authApi'
import { animationThemeMiddleware } from './middleware/animationThemeMiddleware'
import { themeCustomizerMiddleware } from './middleware/themeCustomizerMiddleware'
import authReducer from '../features/pages/auth/authSlice'
import { authMiddleware } from './middleware/authMiddleware'
import { accountApi } from 'src/features/services/api/accountApi/accountApi'
import companyAndCenterSelectionReducer from 'src/features/layouts/mainLayout/header/CompanyAndCenterSelection/companyAndCenterSelectionSlice'
import { linksApi } from 'src/features/services/api/linksApi/linksApi'
import linkReducer from 'src/features/pages/links/linksSlice'
import linkSettingsReducer from 'src/features/pages/links/linkSettingsSlice'

// import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    companyAndCenterSelection: companyAndCenterSelectionReducer,
    counter: counterReducer,
    themeCustomizer: ThemeCustomizerReducer,
    animationTheme: AnimationThemeReducer,
    auth: authReducer,
    link: linkReducer,
    linkSettings: linkSettingsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [linksApi.reducerPath]: linksApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(
      animationThemeMiddleware.middleware,
      themeCustomizerMiddleware.middleware,
      authApi.middleware,
      authMiddleware.middleware,
      accountApi.middleware,
      linksApi.middleware
      // logger
    ),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

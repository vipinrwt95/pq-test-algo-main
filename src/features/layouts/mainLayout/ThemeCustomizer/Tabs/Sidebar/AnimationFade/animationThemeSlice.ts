import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AnimationThemeSliceState {
  animation: string
}

const initialState: AnimationThemeSliceState = {
  animation: '',
}

export const AnimationThemeSlice = createSlice({
  name: 'AnimationTheme',
  initialState,
  reducers: {
    setAnimation: (state, action: PayloadAction<string>) => {
      state.animation = action.payload
    },
  },
})

export const { setAnimation } = AnimationThemeSlice.actions
export default AnimationThemeSlice.reducer

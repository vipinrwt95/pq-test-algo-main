import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { EditLinkFormProps } from './types'

const initialState: EditLinkFormProps = {
  openForm: false,
  noLinks: false,
  link_id: 0,
  title: '',
  link: '',
}

const linkSlice = createSlice({
  name: 'linkSlice',
  initialState,
  reducers: {
    setOpenForm: (state, action: PayloadAction<EditLinkFormProps>) => {
      state.openForm = action.payload.openForm
      state.link_id = action.payload.link_id
      state.title = action.payload.title
      state.link = action.payload.link
    },
    setNoLinks: (state, action: PayloadAction<boolean>) => {
      state.noLinks = action.payload
    },
  },
})

export const { setOpenForm, setNoLinks } = linkSlice.actions
export default linkSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'src/app/store'
import store2 from 'store2'

const SELECTED_COMPANY = 'SELECTED_COMPANY'
const SELECTED_CENTER = 'SELECTED_CENTER'

type Detail = { id: number; name: string }

export interface CompanyAndCenterSelectionState {
  center: null | Detail
  company: null | Detail
}

const initialState: CompanyAndCenterSelectionState = {
  center: store2.get(SELECTED_CENTER) || null,
  company: store2.get(SELECTED_COMPANY) || null,
}

export const companyAndCenterSelectionSlice = createSlice({
  name: 'companyAndCenterSelection',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCenter: (state, action: PayloadAction<Detail | null>) => {
      store2.set(SELECTED_CENTER, action.payload)
      state.center = action.payload
    },
    setCompany: (state, action: PayloadAction<Detail | null>) => {
      store2.set(SELECTED_COMPANY, action.payload)
      state.company = action.payload
    },
  },
})

export const { setCenter, setCompany } = companyAndCenterSelectionSlice.actions

export const selectCenter = (state: RootState) => state.companyAndCenterSelection.center
export const selectCompany = (state: RootState) => state.companyAndCenterSelection.company

export default companyAndCenterSelectionSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: {},
  isPending: false,
  isError: false
}

export const listCardSlice = createSlice({
  name: 'listCard',
  initialState,
  reducers: {}
})

export const { createCardStart, createCardSuccess, createCardError } = listCardSlice.actions
export default listCardSlice.reducer
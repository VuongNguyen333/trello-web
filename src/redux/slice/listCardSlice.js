import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: {},
  isPending: false,
  isError: false
}

export const listCardSlice = createSlice({
  name: 'listCard',
  initialState,
  reducers: {
    createCardStart: (state) => {
      state.isPending = true
      state.isError = false
    },
    createCardSuccess: (state, action) => {
      state.cards = action.payload
      state.isPending = false
      state.isError = false
    },
    createCardError: (state) => {
      state.isPending = false
      state.isError = true
    }
  }
})

export const { createCardStart, createCardSuccess, createCardError } = listCardSlice.actions
export default listCardSlice.reducer
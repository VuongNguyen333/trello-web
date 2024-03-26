import { createSlice } from '@reduxjs/toolkit'
import { createNewColumnAPI } from '~/apis/index'

export const listColumnSlice = createSlice({
  name: 'listColumn',
  initialState: {
    columns: {}
  },
  // extraReducers: (builder) => {
  //   builder.addCase(createNewColumnAPI.fulfilled, (state, action) => {
  //     state.columns.push(action.payload)
  //   })
  // }
})

export const { createNewColumn } = listColumnSlice.actions
export default listColumnSlice.reducer
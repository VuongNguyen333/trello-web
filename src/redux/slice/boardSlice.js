import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
const boardId = '6596702bdadf7f1043b69f07'

export const fetchBoardDetails = createAsyncThunk(
  'fetchBoard',
  async () => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    // lay data qua property data cua axios
    console.log('🚀 ~ request:', request.data)
    request.data.columns = mapOrder(request.data.columns, request.data.columnOrderIds, '_id')
    request.data.columns.forEach(column => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      } else {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      }
    })
    console.log('🚀 ~ request.data:', request.data)
    return request.data
  }
)
const initialState = {
  board: {},
  isPending: false,
  isError: false
}

export const boardSlice = createSlice({
  name: 'boardContent',
  initialState,
  reducers: {
    getStart: (state) => {
      state.isPending = true
      state.isError = false
    },
    getSuccess: (state, action) => {
      state.board = action.payload
      state.isPending = false
      state.isError = false
    },
    getError: (state) => {
      state.isPending = false
      state.isError = true
    },
    moveColumn: (state, action) => {
      state.columns = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoardDetails.pending, (state) => {
        state.isPending = true
        state.isError = false

      })
      .addCase(fetchBoardDetails.fulfilled, (state, action) => {
        state.board = action.payload
        state.isPending = false
        state.isError = false
      })
      .addCase(fetchBoardDetails.rejected, (state) => {
        state.isPending = false
        state.isError = true
      })
  }
})

export const { getStart, getSuccess, getError } = boardSlice.actions
export default boardSlice.reducer
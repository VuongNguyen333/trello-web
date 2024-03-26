// redux: stage management tool
import { configureStore } from '@reduxjs/toolkit'
import boardReducer from './slice/boardSlice'
import listColumnReducer from './slice/listColumnSlice'
export const store = configureStore({
  reducer: {
    board: boardReducer,
    listColumn: listColumnReducer
  }
})


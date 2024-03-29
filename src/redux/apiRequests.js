import { getStart, getError, getSuccess } from './slice/boardSlice'
import {
  createNewColumnAPI,
  createNewCardAPI,
  deleteColumnDetailsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDiffColumnAPI
} from '~/apis/index'
import { cloneDeep, isEmpty } from 'lodash'
import { toast } from 'react-toastify'
import { mapOrder } from '~/utils/sorts'
import { generatePlaceholderCard } from '~/utils/formatters'

export const getBoardDetails = async (board, dispatch) => {
  dispatch(getStart())
  try {
    board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
    board.columns.forEach(column => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholderCard(column)]
        column.cardOrderIds = [generatePlaceholderCard(column)._id]
      } else {
        column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
      }
    })
    dispatch(getSuccess(board))
  } catch (error) {
    dispatch(getError())
  }
}
export const createNewCardRedux = async (board, payload, dispatch) => {
  dispatch(getStart())
  try {
    const data = {
      boardId: board._id,
      ...payload
    }
    const newCard = await createNewCardAPI(data)
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === newCard.columnId)
    if (columnToUpdate) {
      // check placeholderCard
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [newCard]
        columnToUpdate.cardOrderIds = [newCard._id]
      } else {
        columnToUpdate.cards.push(newCard)
        columnToUpdate.cardOrderIds.push(newCard._id)
      }
    }
    dispatch(getSuccess(newBoard))
  } catch (error) {
    if (error.response.status === 422) {
      toast.error('Title Card length must be at least 3 characters long')
    }
    dispatch(getError())
  }
}

export const removeColumn = async (board, columnId, dispatch) => {
  dispatch(getStart())
  try {
    const newBoard = cloneDeep(board)
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(c => c._id !== columnId)
    deleteColumnDetailsAPI(columnId).then(res => {
      toast.success(res.deleteResult)
    })
    dispatch(getSuccess(newBoard))
  } catch (error) {
    dispatch(getError())
  }
}
export const createNewColumn = async (board, columnTitle, dispatch) => {
  dispatch(getStart())
  try {
    const createdColumn = await createNewColumnAPI({
      boardId: board._id,
      title: columnTitle
    })
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(getSuccess(newBoard))
  } catch (error) {
    if (error.response.status === 422) {
      toast.error('Title Column length must be at least 3 characters long')
    }
    dispatch(getError())
  }
}

export const moveColumns = async (board, dndOrderedColumns, dispatch) => {
  dispatch(getStart())
  try {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    updateBoardDetailsAPI(board._id, { columnOrderIds: dndOrderedColumnsIds })
    dispatch(getSuccess(newBoard))
  } catch (error) {
    dispatch(getError())
  }
}

export const updateColumnDetails = async (board, dndOrderedCards, dndOrderedCardIds, columnId, dispatch) => {
  dispatch(getStart())
  try {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
    dispatch(getSuccess(newBoard))
  } catch (error) {
    dispatch(getError())
  }
}

export const updateTitleColumn = async (board, columnId, columnTitle, dispatch) => {
  dispatch(getStart())
  try {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.title = columnTitle
    }
    updateColumnDetailsAPI(columnId, { title: columnTitle })
    dispatch(getSuccess(newBoard))
  } catch (error) {
    dispatch(getError())
  }
}
// B1: cap nhat activeCardOrderIds
// B2: cap nhat overCardOrderIds
// B3: cap nhat lai columnId cua activeCard
export const moveCardToDiffColumn = async (board, currentCardId, prevColumnId, nextColumnId, dndOrderedColumns, dispatch) => {
  dispatch(getStart())
  try {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    // call api
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    if (prevCardOrderIds[0].includes('placeholder-card')) prevCardOrderIds = []
    moveCardToDiffColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
    dispatch(getSuccess(newBoard))
  } catch (error) {
    dispatch(getError())
  }
}



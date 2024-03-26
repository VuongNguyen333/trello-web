// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import {
  updateColumnDetailsAPI,
  moveCardToDiffColumnAPI
} from '~/apis'
import { cloneDeep } from 'lodash'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardDetails } from '~/redux/slice/boardSlice'
function Board() {
  const boardId = '6596702bdadf7f1043b69f07'
  const board = useSelector(state => state.board.board)
  const isPending = useSelector(state => state.board.isPending)
  const isError = useSelector(state => state.board.isError)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('🚀 ~ Board ~ board:', board)
    // react-router-dom (key de lam` chuan chinh)
    // Call api
    dispatch(fetchBoardDetails(boardId))
  }, [])
  if (isPending !== false && isError === false && Object.keys(board).length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vh',
        height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading data...</Typography>
      </Box>
    )
  }

  // const moveColumns = (dndOrderedColumns) => {
  //   const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
  //   const newBoard = cloneDeep(board)
  //   newBoard.columns = dndOrderedColumns
  //   newBoard.columnOrderIds = dndOrderedColumnsIds
  //   // setBoard(newBoard)

  //   // call api
  //   updateBoardDetailsAPI(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  // }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // update Ui/ux
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    // setBoard(newBoard)
    //call api
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })

  }
  // B1: cap nhat activeCardOrderIds
  // B2: cap nhat overCardOrderIds
  // B3: cap nhat lai columnId cua activeCard
  const moveCardToDiffColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    // setBoard(newBoard)

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
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar></AppBar>
      <BoardBar board={board}></BoardBar>
      <BoardContent
        board={board}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDiffColumn={moveCardToDiffColumn}
      ></BoardContent>
    </Container>
  )
}
export default Board
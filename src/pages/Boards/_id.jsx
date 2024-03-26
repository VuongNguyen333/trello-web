// Board detail
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar></AppBar>
      <BoardBar board={board}></BoardBar>
      <BoardContent
        board={board}
      ></BoardContent>
    </Container>
  )
}
export default Board
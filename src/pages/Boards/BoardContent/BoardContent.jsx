import ListColumns from './ListColumns/ListColumns'
import Box from '@mui/material/Box'

function BoardContent({ board }) {
  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trelloCustom.boardContentHeight,
      display: 'flex',
      p: '10px 0'
    }}>
      <ListColumns columns = {board?.columns} />
    </Box>
  )
}

export default BoardContent
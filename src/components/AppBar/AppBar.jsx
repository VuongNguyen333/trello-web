import { useState } from 'react'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'),
        '&::-webkit-scrollbar-track ': { m: 2 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AppsIcon sx={{ color: 'white' }}></AppsIcon>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <SvgIcon component={TrelloIcon} fontSize='small' inheritViewbox sx={{ color: 'white' }}></SvgIcon>
            <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'white' }}>Trello</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Workspaces></Workspaces>
            <Recent></Recent>
            <Starred></Starred>
            <Templates></Templates>
            <Button
              sx={{ color: 'white' }}
              // variant="outlined"
              startIcon={<LibraryAddIcon />}
            >Create</Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            id="outlined-search"
            label="Search..."
            type="text"
            size='small'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'white' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    fontSize='small'
                    sx={{ color: searchValue ? 'white' : 'transparent', cursor: 'pointer' }}
                    onClick={() => setSearchValue('')}
                  />
                </InputAdornment>
              )
            }}
            sx={{
              minWidth: '120px',
              maxWidth: '180px',
              '& label': { color: 'white' },
              '& input': { color: 'white' },
              '& label.Mui-focused': { color: 'white' },
              '& .MuiOutlinedInput-root': {
                fontSize: '0,9rem',
                '& fieldset': { borderWidth: '0.5px !important', borderColor: 'white' },
                '&:hover fieldset': { borderWidth: '2px !important', borderColor: 'white' },
                '&.Mui-focused fieldset': { borderWidth: '2px !important', borderColor: 'white' }
              }
            }}
          />
          <ModeSelect></ModeSelect>

          <Tooltip title="Notification">
            <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
              <NotificationsNoneIcon sx={{ color: 'white' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Notification">
            <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }}></HelpOutlineIcon>
          </Tooltip>

          <Profiles></Profiles>
        </Box>
      </Box>
    </div>
  )
}

export default AppBar

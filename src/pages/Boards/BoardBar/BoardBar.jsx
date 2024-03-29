import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { Tooltip } from '@mui/material'
import { capitalizeFirstLetter } from '~/utils/formatters'
const MENU_STYLES = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}

function BoardBar({ board }) {
  return (
    <div>
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track ': { m: 2 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label= { board?.title }
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<VpnLockIcon />}
            label= { capitalizeFirstLetter(board?.type) }
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<AddToDriveIcon />}
            label="Add to Google Drive"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<BoltIcon />}
            label="Automation"
            clickable
          />
          <Chip
            sx={MENU_STYLES}
            icon={<FilterListIcon />}
            label="Filters"
            clickable
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAddIcon />}
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: 'white' }
            }}
          >Invite</Button>
          <AvatarGroup
            max={6}
            sx={{
              gap: '10px',
              '& .MuiAvatar-root': {
                width: 34,
                height: 34,
                fontSize: 16,
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                '&:first-of-type': { bgcolor: '#a4b0be' }
              }
            }}
          >
            <Tooltip title='VuongIT'>
              <Avatar
                alt="VuongIT"
                src="https://avatars.githubusercontent.com/u/108895030?s=400&u=a4a2dfeb897eb7e4e5a5125150306653774c9f9b&v=4" />
            </Tooltip>
            <Tooltip title='The-Last-Airbender'>
              <Avatar
                alt="The-Last-Airbender"
                src="https://get.wallhere.com/photo/Avatar-The-Last-Airbender-guitarist-dance-photo-shoot-modern-dance-43492.jpg" />
            </Tooltip>
            <Tooltip title='Jax'>
              <Avatar
                alt="Jax"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/11.jpg" />
            </Tooltip>
            <Tooltip title='Ashe'>
              <Avatar
                alt="Ashe"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/14.jpg" />
            </Tooltip>
            <Tooltip title='Garen'>
              <Avatar
                alt="Garen"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/17.jpg" />
            </Tooltip>
            <Tooltip title='Kaisa'>
              <Avatar
                alt="Kaisa"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/44.jpg" />
            </Tooltip>
            <Tooltip title='VuongIT'>
              <Avatar
                alt="VuongIT"
                src="https://avatars.githubusercontent.com/u/108895030?s=400&u=a4a2dfeb897eb7e4e5a5125150306653774c9f9b&v=4" />
            </Tooltip>
            <Tooltip title='The-Last-Airbender'>
              <Avatar
                alt="The-Last-Airbender"
                src="https://get.wallhere.com/photo/Avatar-The-Last-Airbender-guitarist-dance-photo-shoot-modern-dance-43492.jpg" />
            </Tooltip>
            <Tooltip title='Jax'>
              <Avatar
                alt="Jax"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/11.jpg" />
            </Tooltip>
            <Tooltip title='Ashe'>
              <Avatar
                alt="Ashe"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/14.jpg" />
            </Tooltip>
            <Tooltip title='Garen'>
              <Avatar
                alt="Garen"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/17.jpg" />
            </Tooltip>
            <Tooltip title='Kaisa'>
              <Avatar
                alt="Kaisa"
                src="https://cdn.sforum.vn/sforum/wp-content/uploads/2022/09/44.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </div>
  )
}

export default BoardBar

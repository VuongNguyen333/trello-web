import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
function Profiles() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profiles' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt='Vuong Dev'
            src='https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/428613184_777882731041092_5204124655893914184_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHqUZ5cUSXylrivRbUjkDyxEso5hltSZf8SyjmGW1Jl_2CoUeIvsWOWn8KlwtKAFbbdRhY7IZADdc3MBkGMafuW&_nc_ohc=-31aIxv3638AX_Rnqvj&_nc_ht=scontent.fhan5-9.fna&oh=00_AfBXlH1g27yrwkFYmQEO0WueBPAF2QGmugb2QEl_twXQxQ&oe=65ECAEC7'
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profiles"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-profiles'
        }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            sx={{ width: 28, height: 28, mr: 1.2 }}
            alt='Vuong Dev'
            src='https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/428613184_777882731041092_5204124655893914184_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHqUZ5cUSXylrivRbUjkDyxEso5hltSZf8SyjmGW1Jl_2CoUeIvsWOWn8KlwtKAFbbdRhY7IZADdc3MBkGMafuW&_nc_ohc=-31aIxv3638AX_Rnqvj&_nc_ht=scontent.fhan5-9.fna&oh=00_AfBXlH1g27yrwkFYmQEO0WueBPAF2QGmugb2QEl_twXQxQ&oe=65ECAEC7'
          /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar
            sx={{ width: 28, height: 28, mr: 1.2 }}
            alt='Vuong Dev'
            src='https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/428613184_777882731041092_5204124655893914184_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeHqUZ5cUSXylrivRbUjkDyxEso5hltSZf8SyjmGW1Jl_2CoUeIvsWOWn8KlwtKAFbbdRhY7IZADdc3MBkGMafuW&_nc_ohc=-31aIxv3638AX_Rnqvj&_nc_ht=scontent.fhan5-9.fna&oh=00_AfBXlH1g27yrwkFYmQEO0WueBPAF2QGmugb2QEl_twXQxQ&oe=65ECAEC7'
          /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profiles

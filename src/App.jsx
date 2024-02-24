import './App.css'
import Button from '@mui/material/Button'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm'
import ThreeDRotation from '@mui/icons-material/ThreeDRotation'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    // setAge(event.target.value)
    const selectedMode = event.target.value
    setMode(selectedMode)
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="dark">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DarkModeOutlinedIcon fontSize='samll' ></DarkModeOutlinedIcon> Dark
          </div>
        </MenuItem>
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LightModeIcon fontSize='samll' ></LightModeIcon> Light
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SettingsBrightnessIcon fontSize='samll'></SettingsBrightnessIcon> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

function App() {
  return (
    <Container disableGutters maxWidth={false} sx= {{ height: '100vh' }}>
      <Box sx={{
        backgroundColor: 'primary.light',
        width: '100%',
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect></ModeSelect>
      </Box>
      <Box sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
    </Container>
  )
}

export default App

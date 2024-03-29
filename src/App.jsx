import './App.css'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/Register'
import Board from './pages/Boards/_id'
import { Route, Routes } from 'react-router-dom'
import { createTheme } from '@mui/material/styles'

// Tạo chủ đề cho light mode
const lightTheme = createTheme({
  palette: {
    mode: 'light', // Chế độ sáng
  },
});

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Board />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}


export default App

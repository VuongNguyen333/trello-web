import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
// cau hinh react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <App />
      <ToastContainer theme="colored" position="bottom-left" />
    </CssVarsProvider>
  </>
)

import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import './index.css'
import theme from './theme'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
// cau hinh react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// cau hinh MUI dialog
import { ConfirmProvider } from 'material-ui-confirm'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        cancellationButtonProps: { color: 'inherit' },
        confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
        buttonOrder: ['confirm', 'cancel']
      }}>
        <CssBaseline />
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
        <ToastContainer theme="colored" position="bottom-left" />
      </ConfirmProvider>
    </CssVarsProvider>
  </>
)

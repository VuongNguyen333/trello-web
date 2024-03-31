/* eslint-disable quotes */
/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import loginImage from '~/assets/login-image1.jpg'
import SvgIcon from '@mui/material/SvgIcon'
import { Container, Typography, TextField, Button } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import SecurityIcon from '@mui/icons-material/Security'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const styleTextField = {
    display: 'flex',
    margin: '10px 10px 15px 10px',
    fontSize: '10px',
    '& label': { color: '#5C5470' },
    '& label.Mui-focused': { color: '#1976d2' },
    '& .MuiOutlinedInput-root': {
      fontSize: '0,5rem',
      '& fieldset': { borderWidth: '0.5px !important', borderColor: '#C9CCD5' },
      '&:hover fieldset': { borderWidth: '2px !important', borderColor: '#C9CCD5' },
      '&.Mui-focused fieldset': { borderWidth: '2px !important', borderColor: '#1976d2' }
    },
    '& .MuiInputBase-root.Mui-focused': {
      color: '#394867'
    },
    '& .MuiInputBase-root': {
      color: '#394867'
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 100px #EEF5FF inset !important',
      WebkitTextFillColor: '#394867!important',
    }
  }

  const styleBoxIcon = {
    borderRadius: '50%',
    height: '38px',
    width: '38px',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    mr: '5px'
  }

  useEffect(() => {
    // react-router-dom (key de lam` chuan chinh)
    // Call api
    localStorage.setItem('mui-mode', 'light')
  }, [])

  const [email, setEmail] = useState(null)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [msgEmail, setMsgEmail] = useState('')
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleEmailChange = (event) => {
    const tmpEmail = event.target.value
    setEmail(tmpEmail)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tmpEmail)
    if (tmpEmail === null) {
      setIsValidEmail(false)
      setMsgEmail('❌ Email is required.')
    }
    else {
      if (isValidEmail) {
        // Xử lý logic khi email hợp lệ
        setIsValidEmail(true)
      } else {
        setIsValidEmail(false)
        setMsgEmail('❌ Email is invalid. VD: abc@gmail.com')
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Kiểm tra định dạng email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (email === null) {
      setIsValidEmail(false)
      setMsgEmail('❌ Email is required.')
    }
    else {
      if (isValidEmail) {
        // Xử lý logic khi email hợp lệ
        setIsValidEmail(true)
        navigate('/', { replace: true })
      } else {
        setIsValidEmail(false)
        setMsgEmail('❌ Email is invalid.')
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div style={{
      backgroundImage: `url(${loginImage})`, // Sử dụng biến loginImage
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100%'

    }}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '15px'
          }}
        >
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Box bgcolor='#1976d2' sx={styleBoxIcon} >
              <SecurityIcon sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'white'
              }}
              bgcolor='#1976d2'
              fontSize='small'
              />
            </Box>
            <Box bgcolor='#1976d2' sx={styleBoxIcon}>
              <SvgIcon
                component={TrelloIcon}
                inheritViewbox
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'

                }}
                fontSize='small'
              >
              </SvgIcon>
            </Box>
          </Box>
          <Typography
            variant='h6'
            gutterBottom
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: '15px', color: '#1976d2'
            }}
          >
            Login to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username..."
              sx={styleTextField}
              size='small'
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail}
              helperText={!isValidEmail ? `${msgEmail}` : null}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              size='small'
              sx={styleTextField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} size='small'>
                      {showPassword ? <VisibilityOffIcon sx={{ color: '#394867' }} /> : <VisibilityIcon sx={{ color: '#394867' }} />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
              <Button
                type='submit'
                variant="contained"
                sx={{
                  alignItems: 'center',
                  justifyItems: 'center',
                  width: '300px',
                  bgcolor: '#1976d2',
                  color: 'white',
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                Login
              </Button>
            </Box>
          </form>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Typography sx={{ color: 'black' }} > Don't have an account?</Typography>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Link
              onClick={() => {
                navigate('/register', { replace: true })
              }}
              type='submit'
              underline="hover"
              sx={{
                '&:hover ': { color: '#29ADB2', cursor: 'pointer' }
              }}
            >
              {'Create an account'}
            </Link>
          </Box>
        </Box>
      </Container>
    </div >


  )
}

export default LoginPage
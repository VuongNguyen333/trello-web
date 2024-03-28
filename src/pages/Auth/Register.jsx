/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import loginImage from '~/assets/login-image1.jpg'
import SvgIcon from '@mui/material/SvgIcon'
import { Container, Typography, TextField, Button } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Link from '@mui/material/Link'
import { isEmpty } from 'lodash'
function RegisterPage() {
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
    }
  }

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPass, setIsValidPass] = useState(true)
  const [msgEmail, setMsgEmail] = useState('')
  const [msgPass, setMsgPass] = useState('')

  const handleEmailChange = (event) => {
    const tmpEmail = event.target.value
    setEmail(tmpEmail)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
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
  const handlePassChange = (event) => {
    const tmpPass = event.target.value
    console.log('🚀 ~ handlePassChange ~ tmpPass:', tmpPass)
    setPassword(tmpPass)
    const isValidPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(tmpPass)
    if (tmpPass === null) {
      setIsValidPass(false)
      setMsgPass('❌ Password is required.')
    }
    else {
      if (isValidPass) {
      // Xử lý logic khi email hợp lệ
        setIsValidPass(true)
      } else {
        setIsValidPass(false)
        setMsgPass('❌ Password at least 1 letter, a number, at least 8 characters.')
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
      } else {
        setIsValidEmail(false)
        setMsgEmail('❌ Email is invalid. VD: abc@gmail.com')
      }
    }
    const isValidPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)
    if (password === null) {
      setIsValidPass(false)
      setMsgPass('❌ Password is required.')
    }
    else {
      if (isValidPass) {
      // Xử lý logic khi email hợp lệ
        setIsValidPass(true)
      } else {
        setIsValidPass(false)
        setMsgPass('❌ Password at least 1 letter, a number, at least 8 characters.')
      }
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
  return (
    <div style={{
      backgroundImage: `url(${loginImage})`,
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
              mb: '15px',
              color: '#1976d2'
            }}
          >
            Sign up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter Email..."
              sx={styleTextField}
              size='small'
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail}
              helperText={!isValidEmail ? `${msgEmail}` : null}
            />
            <TextField
              label="Enter Password"
              type="Enter Password"
              size='small'
              sx={styleTextField}
              value={password}
              onChange={handlePassChange}
              error={!isValidPass}
              helperText={!isValidPass ? `${msgPass}` : null}
            />
            <TextField
              label="Confirm Password"
              type="Confirm password"
              size='small'
              sx={styleTextField}
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
                  '&:hover': { bgcolor: '#1976d2' }
                }}
              >
                Create your Trello account
              </Button>
            </Box>
          </form>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Typography > Already have an account?</Typography>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex', mb: '15px' }}>
            <Link
              href="/login"
              underline="hover"
              sx={{
                '&:hover ': { color: '#29ADB2' }
              }}
            >
              {'Sign in'}
            </Link>
          </Box>
        </Box>
      </Container>
    </div >

  )
}

export default RegisterPage
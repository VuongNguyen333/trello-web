/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import loginImage from '~/assets/login-image1.jpg'
import SvgIcon from '@mui/material/SvgIcon'
import { Container, Typography, TextField, Button } from '@mui/material'
import SecurityIcon from '@mui/icons-material/Security'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import Link from '@mui/material/Link'
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

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValid(true); // Reset validation state when email changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra định dạng email
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (isValidEmail) {
      // Xử lý logic khi email hợp lệ
      console.log('Email hợp lệ:', email);
    } else {
      // Xử lý logic khi email không hợp lệ
      console.log('Email không hợp lệ:', email);
      setIsValid(false); // Set validation state to false
    }
  };
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
            width: '350px',
            height: '350px',
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
          <Typography variant='h6' gutterBottom sx={{ display: 'flex', justifyContent: 'center', mb: '15px', color: '#1976d2' }}>Login to your account</Typography>
          <TextField
            label="Username..."
            sx={styleTextField}
            size='small'
          />
          <TextField
            label="Password"
            type="password"
            size='small'
            sx={styleTextField}
          />
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Button
              variant="contained"
              sx={{
                alignItems: 'center',
                justifyItems: 'center',
                width: '300px',
                bgcolor: '#1976d2',
                '&:hover': { bgcolor: '#1976d2' }
              }}
            >
              Login
            </Button>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Typography > Don't have an account?</Typography>
          </Box>
          <Box sx={{ justifyContent: 'center', display: 'flex', p: 1 }}>
            <Link
              href="/register"
              underline="hover"
              sx={{
                '&:hover ': { color: '#29ADB2' }
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
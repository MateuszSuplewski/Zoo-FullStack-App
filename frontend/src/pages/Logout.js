import React, { useEffect } from 'react'
import { Box, Typography, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createActionLogout } from '../state/auth'

const Logout = () => {
  const navigate = useNavigate()
  const storeDispatch = useDispatch()

  useEffect(() => {
    storeDispatch(createActionLogout())
    setTimeout(() => navigate(-1), 5000)
  })

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Successfully logged out. You will be redirected in 5s
        </Typography>
      </Box>
    </Container>
  )
}

export default Logout

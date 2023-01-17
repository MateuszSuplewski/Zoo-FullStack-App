import React, { useState, useEffect } from 'react'
import { Button, TextField, Box, Avatar, Typography, Link, Container, Grid, Alert } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createActionRegister } from '../state/auth'

const Register = () => {
  const storeDispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth)
  const { value, error } = authState

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (value && value.token) setTimeout(() => navigate(-1), 5000)
  }, [value])

  const clearFields = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  const saveUser = async (e) => {
    e.preventDefault()

    storeDispatch(createActionRegister({ firstname: firstName, lastname: lastName, email, password })) 
    // ten sam email przechodzi ... cos z tym zrobic!
    clearFields()
  }

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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockPersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {value && value.token && (
          <Alert sx={{ mt: 1, width: '100%' }} severity="success">
            Account successfully created, You will be logged in and redirected
            in 5s
          </Alert>
        )}
        {error && (
          <Alert sx={{ mt: 1, width: '100%' }} severity="error">
            Email already in use
          </Alert>
        )}
        <Box component="form" noValidate onSubmit={saveUser} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                autoFocus
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!(firstName && lastName && email && password)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Register
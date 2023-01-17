import React, { useState, useEffect } from 'react'
import { Button, TextField, Box, Avatar, Typography, Link, Container, Grid, Alert } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createActionLogin } from '../state/auth'

const Login = () => {
  const storeDispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth)
  const { value, error } = authState

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (value && value.token) setTimeout(() => navigate(-1), 5000)
  }, [value])

  const clearFields = () => {
    setEmail('')
    setPassword('')
  }

  const validateUser = async (e) => {
    e.preventDefault()
    storeDispatch(createActionLogin({email,password}))
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
          Sign in
        </Typography>
        {value && value.token && (
          <Alert sx={{ mt: 1, width: '100%' }} severity="success">
            Logged successfully, You will be redirected in 5s
          </Alert>
        )}
        {error && (
          <Alert sx={{ mt: 1, width: '100%' }} severity="error">
            Invalid email or password
          </Alert>
        )}
        <Box component="form" onSubmit={validateUser} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!(email && password)}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login

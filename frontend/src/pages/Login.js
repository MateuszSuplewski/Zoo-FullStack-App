import React, { useState } from 'react'
import { Button, TextField, Box, Avatar, Typography, Link, Container, Grid } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const validateUser = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/auth/authenticate',
        {
          email,
          password,
        }
      )

      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
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

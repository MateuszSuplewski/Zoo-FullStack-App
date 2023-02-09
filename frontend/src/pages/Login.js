import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Avatar, Typography, Link, Container, Grid, Alert } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { createActionLogin } from '../state/auth'
import loginFields from '../data/loginFields'
import validateForm from '../helpers/validateForm'
import useForm from '../hooks/useForm'

const Login = () => {
  const storeDispatch = useDispatch()
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth)
  const { value, error } = authState

  useEffect(() => {
    if (value && value.token) setTimeout(() => navigate(-1), 5000)
  }, [value])

  const onSubmit = (data) => storeDispatch(createActionLogin({ ...data }))

  const [handleInputChange, handleFormSubmit, state, errors] = useForm(validateForm, loginFields, onSubmit)

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
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {loginFields.map(({ name, label, type }) => (
            <TextField
              error={errors[label] === null}
              helperText={errors[label]}
              key={name}
              id={name}
              type={type}
              label={label}
              margin="normal"
              fullWidth
              name={name}
              value={state[name]}
              onChange={(e) => handleInputChange(e, type)}
            />
          ))}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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
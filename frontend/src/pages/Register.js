import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Avatar, Typography, Link, Container, Grid, Alert } from '@mui/material'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { createActionRegister } from '../state/auth'
import registerFields from '../data/registerFields'
import validateForm from '../helpers/validateForm'
import useForm from '../hooks/useForm'

const Register = () => {
  const navigate = useNavigate()
  const storeDispatch = useDispatch()
  const authState = useSelector((state) => state.auth)
  const { value, error } = authState

  useEffect(() => {
    if (value && value.token) setTimeout(() => navigate(-1), 5000)
  }, [value])

  const onSubmit = (data) => storeDispatch(createActionRegister({ ...data }))

  const [handleInputChange, handleFormSubmit, state, errors] = useForm(validateForm, registerFields, onSubmit)

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
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {registerFields.map(({ name, label, type }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  error={errors[label] === null}
                  helperText={errors[label]}
                  multiline={type === 'textarea'}
                  id={name}
                  type={type === 'textarea' ? 'text' : type}
                  label={label}
                  name={name}
                  variant="outlined"
                  value={state[name]}
                  fullWidth
                  onChange={(e) => handleInputChange(e, type)}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
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

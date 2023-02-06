import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import FullPageLoader from '../components/FullPageLoader'
import FullPageMessage from '../components/FullPageMessage'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {createActionGet} from '../state/animals'
import {Box, Grid, Typography, Button} from '@mui/material'
import { createActionAdd } from '../state/cart'
import useRole from '../hooks/useRole'

const Animal = () => {
  const {animalId} = useParams()

  const storeDispatch = useDispatch()
  const animalsState = useSelector((state) => state.animals)
  const {currentAnimal, loading, error} = animalsState
  const [userRole] = useRole('http://localhost:8080/api/v1/auth/role')

  useEffect(() => {
    storeDispatch(createActionGet(animalId))
  }, [])

  return (
    <>
      <Navbar />
      {loading ? (
        <FullPageLoader />
      ) : error ? (
        <FullPageMessage>{error}</FullPageMessage>
      ) : (
        currentAnimal && (
          <Grid container sx={{p: {xs: 2, sm: 6}}} spacing={4}>
            <Grid item xs={12} md={6} lg={8}>
              <Box
                sx={{
                  backgroundImage: currentAnimal.image ? `url(${currentAnimal.image})` : `url(https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: {xs: '450px', md: '100%'},
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Box>
                <Typography
                  component="p"
                  variant="h3"
                  fontFamily={'monospace'}
                  gutterBottom
                >
                  {'Meet ' + currentAnimal.name}
                </Typography>
                <Typography
                  component="p"
                  variant="h6"
                  fontFamily={'cursive'}
                  gutterBottom
                >
                  {currentAnimal.name +
                    ' is one of the representatives of the ' +
                    currentAnimal.species.name +
                    ' species'}
                </Typography>
                <Typography component="p" variant="h6" fontFamily={'cursive'}>
                  {currentAnimal.description}
                </Typography>

                <Grid container spacing={2} sx={{mt: 2}}>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: 180,
                        height: 180,
                        m: '0 auto',
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          opacity: [0.9, 0.8, 0.7],
                        },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        boxShadow: '8px 8px 17px -11px rgba(66, 68, 90, 1)',
                      }}
                    >
                      <Typography component="p" variant="h6" gutterBottom>
                        {'WEIGHT'}
                      </Typography>
                      <Typography component="p" variant="p">
                        {currentAnimal.weight + ' KG'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      sx={{
                        width: 180,
                        height: 180,
                        m: '0 auto',
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          opacity: [0.9, 0.8, 0.7],
                        },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        flexWrap: 'wrap',
                        boxShadow: '8px 8px 17px -11px rgba(66, 68, 90, 1)',
                      }}
                    >
                      <Typography component="p" variant="h6" gutterBottom>
                        {'AGE'}
                      </Typography>
                      <Typography component="p" variant="p">
                        {currentAnimal.age + ' YEARS'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{maxWidth: 300, m: '0 auto', mt: 3}}
                    fullWidth
                    size="large"
                    onClick={() => storeDispatch(createActionAdd({...currentAnimal, money: 0}))}
                    disabled={ userRole !== "ADMIN" && userRole !== "USER" }
                  >
                    SUPPORT ANIMAL
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )
      )}
    </>
  )
}

export default Animal

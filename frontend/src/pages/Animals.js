import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import AnimalCard from '../components/AnimalCard'
import {Grid} from '@mui/material'
import Pagination from '../components/Pagination'
import img from '../assets/img/bg_nature_2.jpg'
import {createActionGetAll} from '../state/animals'
import {useDispatch, useSelector} from 'react-redux'
import AddAnimal from '../components/AddAnimal'
import FullPageLoader from '../components/FullPageLoader'
import FullPageMessage from '../components/FullPageMessage'
import useRole from '../hooks/useRole'

const Animals = () => {
  const storeDispatch = useDispatch()
  const animalsState = useSelector((state) => state.animals)
  const {value, loading, error} = animalsState
  const [userRole] = useRole('http://localhost:8080/api/v1/auth/role')

  useEffect(() => {
    storeDispatch(createActionGetAll())
  }, [])

  return (
    <>
      <Navbar />
      {userRole === 'ADMIN' && <AddAnimal />}
      {loading ? (
        <FullPageLoader />
      ) : error ? (
        <FullPageMessage>{error}</FullPageMessage>
      ) : (
        <Grid
          container
          rowSpacing={8}
          columnSpacing={5}
          pt={6}
          px={2}
          columns={12}
          sx={{
            justifyContent: 'center',
            backgroundImage: img ? `url(${img})` : `url(https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Pagination limit={12} path={'/animals/page'}>
            {value &&
              value.map((animal, index) => (
                <Grid item sm={12} md={6} lg={4} key={index}>
                  <AnimalCard animal={animal} />
                </Grid>
              ))}
          </Pagination>
        </Grid>
      )}
    </>
  )
}

export default Animals

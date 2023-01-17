import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AnimalCard from '../components/AnimalCard'
import { Grid } from '@mui/material'
import Pagination from '../components/Pagination'
import img from '../assets/img/bg_nature_2.jpg'
import { createActionGet } from '../state/animals'
import { useDispatch, useSelector } from 'react-redux'

const Animals = () => {
  const storeDispatch = useDispatch()
  const authState = useSelector((state) => state.animals)
  const { value, error } = authState

  useEffect(() => {
    storeDispatch(createActionGet())
  }, [])

  return (
    <>
      <Navbar />
      {error ? (
        <div>{error}</div>
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
            backgroundImage: `url(${img})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Pagination limit={12} path={'/animals/page'}>
            {value &&
              value.map(({ name, id, species }) => (
                <Grid item sm={12} md={6} lg={4} key={id}>
                  <AnimalCard id={id} name={name} species={species} />
                </Grid>
              ))}
          </Pagination>
        </Grid>
      )}
    </>
  )
}

export default Animals

import React, {useEffect, useState} from 'react'
import Navbar from '../components/Navbar'
import {useDispatch, useSelector} from 'react-redux'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import OrdersAPI from '../api/ordersProvider'

const Orders = () => { 

  const [orders, setOrders] = useState([])
  const authStore = useSelector((state) => state.auth)

  const api = new OrdersAPI('http://localhost:8080/api/v1/orders')

  useEffect(() => {
    if(authStore && authStore.value) abc()
  }, [])

  const abc = async () => {
    api
    .getByUser(authStore.value.token, 'user')
    .then((resp) => {
      setOrders(resp.data)
      console.log(resp.data)
    })
    .catch((err) => {
     console.log(err.message)
    })
  }

  return (
    <>
      <Navbar />
      {
        orders && orders.map((order,index) => (
            <Grid container spacing={2} justifyContent={'center'} sx={{mt: 2, p: '0 5rem'}}>
            <Grid item xs={8}>
            {order.orderedAnimals.map((orderedAnimal,index2) => (
            <Paper key={(index+1)*(index2+1)} sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', p: '1rem 2rem', mb: 1.5, borderRadius: '8px', maxWidth: 800}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Avatar src={orderedAnimal.animal.image} variant="square" sx={{ width: 80, height: 80, borderRadius: '4px' }}/>
                <Box ml={2}>
                    <Typography>{orderedAnimal.animal.name}</Typography>
                    <Typography>{orderedAnimal.animal.species.name}</Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                    <Typography>{orderedAnimal.money}</Typography>
            </Box>
        </Paper>
                ))}
        <Box pt={5}/>
         </Grid>
         </Grid>
        ))
      }
    </>
  )
}

export default Orders

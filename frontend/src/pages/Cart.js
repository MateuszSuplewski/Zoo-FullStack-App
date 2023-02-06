import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {useDispatch, useSelector} from 'react-redux'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { createActionRemove } from '../state/cart'
import { createActionSetDonation } from '../state/cart'
import OrdersAPI from '../api/ordersProvider'
import AuthAPI from '../api/authProvider'

const Cart = () => { // zaimplementowac dodanie zamowienia!
  const cartsState = useSelector((state) => state.cart)
  const storeDispatch = useDispatch()
  const api = new OrdersAPI('http://localhost:8080/api/v1/orders')
  const authApi = new AuthAPI('http://localhost:8080/api/v1/auth')
  const authStore = useSelector((state) => state.auth)

  const [address, setAddress] = useState('')
  const [user, setUser] = useState('')

  const handleDelete = (animalId) => {
    storeDispatch(createActionRemove(animalId))
  }

  const handleMoneySet = (e, animal) => {
    storeDispatch(createActionSetDonation({...animal, money: Number(e.target.value)}))
  }
  
  const calculateFinalPrice = () => {
    const finalPrice = cartsState.reduce(
      (accumulator, currentValue) => accumulator + currentValue.money,
      0
    );

    return finalPrice
  }

  const handleOrder = async () => {
    const orderedAnimals = cartsState.map(
      animal => ({money:animal.money, animal:{id: animal.id}})
    )

    const order = {
      user: {
        id: user
      },
      address,
      orderedAnimals,
    }

    console.log(order)

    api.create(order)
  }

  useEffect(() => { 
    if(authStore && authStore.value) abc()
   
  },[])

  const abc = async () => {
    authApi
    .fetchId(authStore.value.token, 'id')
    .then((resp) => {
      setUser(resp.data)
    })
    .catch((err) => {
     console.log(err.message)
    })
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={2} sx={{mt: 2, p:{xs:'0 1rem', sm:'0 3rem'}}}>
                  <Grid item xs={12} md={8}>
                    {
                        cartsState.map((animal,index) => (
                            <Paper key={index} sx={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', p: '1rem 2rem', mb: 1.5, borderRadius: '8px', maxWidth: 650}}>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                <Avatar src={animal.image || 'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg'} variant="square" sx={{ width: 80, height: 80, borderRadius: '4px' }}/>
                                <Box ml={2}>
                                    <Typography>{animal.name}</Typography>
                                    <Typography>{animal.species.name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                                <TextField label={"Declare money  "} sx={{maxWidth: 80}} size='small' variant='standard' type='number' defaultValue={animal.money || ''} onChange={(e) => handleMoneySet(e,animal)}/>
                                <Button variant="contained" onClick={() => handleDelete(animal.id)}>
                                    REMOVE
                                </Button>
                            </Box>
                        </Paper>
                        ))
                    }
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{p: 3, maxWidth: 300, m:'0 auto'}}>
                      <Box component={"h3"} sx={{textAlign: 'center'}}>Order Summary</Box>
                      <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center', flexWrap: 'wrap'}}>
                        <TextField value={address} sx={{mt:2}} label={"Address"} onChange={(e) => setAddress(e.target.value)}/>
                      </Box>
                      <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
                        <Box sx={{width: '50%'}} component={"h5"}>Total</Box>
                        <Box component={"h5"}>{cartsState && calculateFinalPrice()}</Box>
                        <Button onClick={handleOrder} fullWidth>CLICK TO PAY</Button>
                      </Box>
                    </Paper>
                  </Grid>
     </Grid>
    </>
  )
}

export default Cart

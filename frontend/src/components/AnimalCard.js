import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { createActionDelete } from '../state/animals'
import UpdateAnimal from './UpdateAnimal'
import useRole from '../hooks/useRole'

const AnimalCard = ({ animal }) => {
  const storeDispatch = useDispatch()
  const {id, name, species, imgSrc} = animal
  const [userRole] = useRole('http://localhost:8080/api/v1/auth/role')

  const deleteAnimal = () => {
    storeDispatch(createActionDelete(id))
  }

  return (
    <Card id={id} sx={{ minWidth: 320, maxWidth: 420, margin: '0 auto' }}>
      <CardMedia
        sx={{ height: 320 }}
        image="https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?cs=srgb&dl=pexels-pixabay-247502.jpg&fm=jpg"
        title="green iguana"
      >
        <Box
          display="flex"
          height={'100%'}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            color={'white'}
            sx={{
              letterSpacing: '1px',
              fontFamily: 'fantasy',
              textShadow: 'black 1px 0 20px',
            }}
            mx={2}
            align="center"
            variant="h3"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            color={'white'}
            sx={{
              letterSpacing: '1px',
              fontSize: '1rem',
              textShadow: 'black 2px 2px 8px',
            }}
            mx={2}
            py={1}
            align="center"
            variant="body2"
          >
            {species && species.name.toUpperCase()}
          </Typography>
        </Box>
      </CardMedia>
      <CardActions>
        <Button
          color="success"
          variant="contained"
          component={Link}
          to={`/animal/${id}`}
          fullWidth
          size="medium"
        >
          Read more
        </Button>
        {
              userRole === 'ADMIN' && (<><Button variant='contained' size='large' color='error' onClick={deleteAnimal}>DELETE</Button> <UpdateAnimal animal={animal}/></>)
         }
      </CardActions>
    </Card>
  )
}

export default AnimalCard

// ścieżka zapewne do zmiany

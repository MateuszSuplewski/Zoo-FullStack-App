import * as React from 'react'
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material'
import { Link } from 'react-router-dom'

const AnimalCard = ({ id, name, species, imgSrc }) => {
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
      </CardActions>
    </Card>
  )
}

export default AnimalCard

// ścieżka zapewne do zmiany

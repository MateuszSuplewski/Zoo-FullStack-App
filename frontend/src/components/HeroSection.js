import * as React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const HeroSection = ({ img, decorative, title, subtitle }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: '60vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        mb: 6,
        textAlign: 'center',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <Box
        sx={{
          color: 'white',
          fontWeight: 600,
          fontSize: 'sm',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {decorative}
      </Box>
      <Typography
        variant="h2"
        sx={{
          color: 'white',
          fontSize: {xs: '3rem', sm: '4rem', md: '5rem'},
          textShadow: 'black 1px 0 2px',
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 'lg',
          color: '#CEEAF7',
          fontWeight: 'bold',
          maxWidth: '54ch',
          textShadow: 'black 1px 0 2px',
        }}
      >
        {subtitle}
      </Typography>
      <Button component={Link} to={'/animals'} sx={{mt: 4}} variant="contained">
        Check Animals
      </Button>
    </Box>
  );
};

export default HeroSection

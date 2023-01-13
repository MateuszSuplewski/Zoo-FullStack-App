import * as React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary'

const ShowcaseCardsSection = ({ cardsContent }) => {
  return (
    <Box sx={{flexGrow: 1, mt: 10}}>
      <Grid container spacing={{xs: 2, md: 3}} columns={12}>
        {cardsContent.map(({title, description}, index) => (
          <Grid item sm={12} md={4} key={index}>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: 2,
                mb: 6,
                p: 1,
                textAlign: 'center',
              }}
            >
              <Box>
                <PhotoLibraryIcon fontSize="large" />
              </Box>
              <Box
                sx={{
                  fontWeight: 600,
                  fontSize: 'sm',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {title}
              </Box>
              <Typography
                sx={{
                  fontSize: 'lg',
                  fontWeight: 'bold',
                  maxWidth: '54ch',
                }}
              >
                {description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowcaseCardsSection

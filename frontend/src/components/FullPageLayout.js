import { Box } from '@mui/material'
import React from 'react'

const FullPageLayout = ({ children }) => (
  <Box
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    width={'100vw'}
    height={'100vh'}
  >
    {children}
  </Box>
)

export default FullPageLayout

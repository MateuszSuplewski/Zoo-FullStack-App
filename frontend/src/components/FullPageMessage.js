import React from 'react'
import FullPageLayout from './FullPageLayout'
import { Typography } from '@mui/material'

const FullPageMessage = ({ color, variant, children }) => (
  <FullPageLayout >
    <Typography
      color={color}
      variant={variant}
    >
      {children}
    </Typography>
  </FullPageLayout>
)

export default FullPageMessage

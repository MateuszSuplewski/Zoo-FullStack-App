import React from 'react'
import FullPageLayout from './FullPageLayout'
import { CircularProgress } from '@mui/material'

export const FullPageLoader = () => (
  <FullPageLayout >
    <CircularProgress/>
  </FullPageLayout>
)

export default FullPageLoader

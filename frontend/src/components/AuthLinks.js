import * as React from 'react'
import { Typography, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthLinks = () => {
  const authState = useSelector((state) => state.auth)
  const { value } = authState
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      {value ? (
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            sx={{ color: 'inherit', textDecoration: 'none' }}
            component={Link}
            to={'/logout'}
            textAlign="center"
          >
            Logout
          </Typography>
        </MenuItem>
      ) : (
        <>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              sx={{ color: 'inherit', textDecoration: 'none' }}
              component={Link}
              to={'/register'}
              textAlign="center"
            >
              Register
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              sx={{ color: 'inherit', textDecoration: 'none' }}
              component={Link}
              to={'/login'}
              textAlign="center"
            >
              Login
            </Typography>
          </MenuItem>
        </>
      )}
    </>
  )
}
export default AuthLinks

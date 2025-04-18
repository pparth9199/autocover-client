// src/Header.js
import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from './assets/logo.png'
import { FaMoon, FaSun } from 'react-icons/fa'

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: darkMode ? '#0a192f' : 'black' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <img src={Logo} alt="AutoCover Logo" style={{ height: 36, marginRight: 10 }} />
          <Typography variant="h6" component={Link} to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            AutoCover
          </Typography>
        </Box>
        <Button component={Link} to="/" sx={{ color:  '#fff' }}>Home</Button>
        <Button component={Link} to="/pricing" sx={{ color: '#fff' }}>Pricing</Button>
        <Button component={Link} to="/contact" sx={{ color:  '#fff' }}>Contact</Button>
        <Button component={Link} to="/about" sx={{ color:'#fff' }}>About</Button>
        <Box ml={2}>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

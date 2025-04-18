// src/App.js
import React, { useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import About from './pages/About'
import Footer from './Footer'
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material'

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('autocover-theme') === 'dark')

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev
      localStorage.setItem('autocover-theme', next ? 'dark' : 'light')
      return next
    })
  }

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      ...(darkMode && {
        background: {
          default: '#0a192f',
          paper: '#112240'
        },
        primary: { main: '#64ffda' },
        text: { primary: '#ffffff' }
      })
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif'
    }
  }), [darkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box
          display="flex"
          flexDirection="column"
          minHeight="100vh"
        >
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Box flex={1}>
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App

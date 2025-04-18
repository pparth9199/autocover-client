// src/pages/About.js
import React from 'react'
import { Container, Typography, Box } from '@mui/material'

function About() {
  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About AutoCover
      </Typography>

      <Box mt={2}>
        <Typography variant="body1" color="textSecondary">
          AutoCover was built with a mission to empower job seekers with smart, personalized tools
          to stand out. We believe cover letters should be easy, effective, and unique to every opportunity.
        </Typography>

        <Typography variant="body1" color="textSecondary" mt={2}>
          Our AI models are trained on industry best practices and real-world hiring insights to help
          you make an impression that matters.
        </Typography>

        <Typography variant="body1" color="textSecondary" mt={2}>
          Whether you're applying for your first role or your dream company, AutoCover helps you craft
          professional, personalized letters in seconds.
        </Typography>
      </Box>
    </Container>
  )
}

export default About

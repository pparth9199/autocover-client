// src/pages/Contact.js
import React from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material'

function Contact() {
  return (
    <Container maxWidth="sm" sx={{ pt: 6, pb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Typography variant="body1" align="center" color="textSecondary">
        We'd love to hear from you! Fill out the form or email us at <strong>support@autocover.ai</strong>
      </Typography>

      <Box mt={4}>
        <TextField fullWidth label="Your Name" margin="normal" />
        <TextField fullWidth label="Your Email" margin="normal" />
        <TextField fullWidth label="Your Message" multiline rows={4} margin="normal" />
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>Send Message</Button>
      </Box>
    </Container>
  )
}

export default Contact

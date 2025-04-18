// src/pages/Pricing.js
import React from 'react'
import { Container, Typography, Box } from '@mui/material'

function Pricing() {
  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Affordable Pricing
      </Typography>

      <Typography variant="body1" align="center" color="textSecondary" sx={{ maxWidth: 600, mx: 'auto' }}>
        Start free and upgrade when you’re ready. Get unlimited cover letters, editable templates,
        AI personalization and more with our Pro plan.
      </Typography>

      <Box mt={6}>
        <Typography variant="h6">Free Plan</Typography>
        <Typography color="textSecondary">✓ 3 cover letters per month<br />✓ Basic customization</Typography>

        <Box mt={3}>
          <Typography variant="h6">Pro Plan – $9.99/month</Typography>
          <Typography color="textSecondary">
            ✓ Unlimited letters<br />✓ Full customization<br />✓ Priority support<br />✓ PDF downloads
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default Pricing

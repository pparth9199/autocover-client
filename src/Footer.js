import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ mt: 8, py: 3, textAlign: 'center', borderTop: '1px solid #ccc' }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} PRTech. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

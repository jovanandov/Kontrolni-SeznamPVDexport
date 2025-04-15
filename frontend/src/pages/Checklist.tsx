import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Checklist: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Kontrolni Seznam Zgodovine
        </Typography>
        <Typography variant="body1">
          Tukaj bo prikazan kontrolni seznam zgodovine.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Checklist; 
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const Urejanje: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  
  return (
    <Box>
      <Typography variant="h4">
        {id ? 'Urejanje seznama' : 'Nov seznam'}
      </Typography>
      <Typography>
        {id ? `Urejanje seznama z ID: ${id}` : 'Ustvarjanje novega seznama'}
      </Typography>
    </Box>
  );
};

export default Urejanje; 
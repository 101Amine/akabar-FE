import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box
      sx={{
        position: 'fixed', // Fixed position to cover the entire screen
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
        zIndex: 1000, // High z-index to be on top of other elements
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;

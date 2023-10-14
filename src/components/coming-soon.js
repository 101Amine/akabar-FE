import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { ComingSoonLogo } from './coming-soon-logo';

export const ComingSoon = (props) => {
  
  return (
    <Box 
    display="flex" 
    flexDirection="column" 
    justifyContent="center" 
    alignItems="center"
    height="100%"
    width="100%"
  >
    <ComingSoonLogo/>
    <Typography variant="h5" mt={2}>
      Development in progress...
    </Typography>
  </Box>
  );
};

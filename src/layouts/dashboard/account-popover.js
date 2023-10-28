import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { useSelector } from 'react-redux';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();
  const connectedUser = useSelector((state) => state.auth.name);

  const handleSignOut = useCallback(() => {
    onClose?.();
    auth.handleSignOut();
    router.push('/auth/login');
  }, [onClose, auth, router]);

  function toTitleCase(str) {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography
          color="text.main"
          variant="body2"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            fontWeight: '500',
          }}
        >
          {toTitleCase(connectedUser)}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          sx={{ display: 'flex', justifyContent: 'center' }}
          onClick={handleSignOut}
        >
          Se déconnecter
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

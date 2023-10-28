import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { styled, useTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { disableIconOnly, setIconOnly } from '../../redux/uiSlice';

export const SideNav = (props) => {
  const { open, onClose, submenuItems } = props;
  const { isIconOnly } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const theme = useTheme();
  const dispatch = useDispatch();

  const StyledListItem = styled(({ theme, isIconOnly, ...rest }) => (
    <ListItem {...rest} />
  ))(({ theme, active, isIconOnly }) => ({
    '&:hover': {
      backgroundColor: '#E8E8E8',
      cursor: 'pointer',
    },
    backgroundColor: active ? '#E0E0E0' : 'transparent',
    color: 'black',
    fontFamily: theme.typography.fontFamily,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    '&.Mui-selected, &.Mui-selected:hover': {
      color: '#FFF',
    },
    borderRadius: '10px',
    padding: isIconOnly ? '10px 0' : '10px 16px',
    justifyContent: isIconOnly ? 'center' : 'flex-start',
  }));

  const content = (
    <Scrollbar
      onMouseEnter={() => dispatch(setIconOnly())}
      onMouseLeave={() => dispatch(disableIconOnly())}
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#F2F2F2',
        }}
      >
        <Box sx={{ p: 3, display: 'flex', gap: 1 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: isIconOnly && 'center',
              gap: 1.5,
              width: '100%',
              p: '12px',
            }}
          >
            {isIconOnly ? (
              <div>
                <Logo />
              </div>
            ) : (
              <>
                <div>
                  <Logo />
                </div>
                <Typography
                  color="black"
                  variant="subtitle1"
                  fontFamily={'cursive'}
                  letterSpacing={'5px'}
                  fontWeight={'bold'}
                  fontSize={'18px'}
                  marginTop={'5px'}
                >
                  Akabar
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'neutral.300' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            <List component="nav" sx={{ '& > *': { marginBottom: '10px' } }}>
              {submenuItems.map((item) => {
                const isActive = item.path === pathname;
                return (
                  <StyledListItem
                    key={item.label}
                    button
                    component={NextLink}
                    href={item.path}
                    active={isActive}
                    isIconOnly={isIconOnly}
                  >
                    <ListItemIcon
                      sx={{
                        justifyContent: isIconOnly ? 'center' : 'flex-start',
                        width: isIconOnly ? '100%' : 'auto',
                      }}
                    >
                      <item.icon />
                    </ListItemIcon>
                    {!isIconOnly && <ListItemText primary={item.label} />}
                  </StyledListItem>
                );
              })}
            </List>
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        key={isIconOnly ? 'icon-only' : 'full-width'}
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: isIconOnly ? '80px' : '280px',
            transition: theme.transitions.create('all', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  submenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    }),
  ).isRequired,
};

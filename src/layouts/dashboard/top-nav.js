import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { items } from './config';
import { usePathname } from 'next/navigation';
import { SideNavItem } from './side-nav-item';
import { getInitials } from '../../utils/get-initials';
import { useSelector } from 'react-redux';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64.5;

export const TopNav = (props) => {
  const { onNavOpen, setActiveTopNavItem, isIconOnly } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const pathname = usePathname();
  const accountPopover = usePopover();
  const paddingLeftValue = isIconOnly ? '80px' : `${SIDE_NAV_WIDTH}px`;
  const connectedUser = useSelector((state) => state.auth.name);

  const handleTopNavClick = (menuItemKey) => {
    setActiveTopNavItem(menuItemKey);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: '#164cc8',
          position: 'sticky',
          left: {
            lg: paddingLeftValue,
          },
          top: 0,
          width: lgUp ? 'calc(100% - 15px)' : '100vw',
          marginLeft: lgUp ? '15px' : '0px',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          boxShadow="0 1px 5px rgba(18,44,43,.3019607843)"
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <div
              style={{
                display: 'flex',
                gap: '15px',
                paddingLeft: !lgUp
                  ? '0px'
                  : isIconOnly
                  ? '80px'
                  : `${SIDE_NAV_WIDTH - 5}px`, // Updated paddingLeft
                listStyle: 'none',
              }}
            >
              {items.map((item) => {
                let active = false;
                if (item.path === '/') {
                  active = pathname === item.path;
                } else {
                  const pathParts = item.path.split('/');
                  const pathnameParts = pathname.split('/');
                  active = pathParts[1] && pathParts[1] === pathnameParts[1];
                }
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                    lgUp={lgUp}
                    onItemClicked={handleTopNavClick}
                  />
                );
              })}
            </div>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: 'pointer',
                  height: 40,
                  width: 40,
                }}
              >
                {getInitials(connectedUser)}
              </Avatar>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};

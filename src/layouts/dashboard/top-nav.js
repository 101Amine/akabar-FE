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
  useMediaQuery,
} from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { items } from './config';
import { usePathname } from 'next/navigation';
import { SideNavItem } from './side-nav-item';
import PersonIcon from '@mui/icons-material/Person';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen, setActiveTopNavItem, isIconOnly } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const pathname = usePathname();
  const accountPopover = usePopover();
  const paddingLeftValue = isIconOnly ? '80px' : `${SIDE_NAV_WIDTH}px`;

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
                gap: '8px',
                paddingLeft: isIconOnly ? '80px' : `${SIDE_NAV_WIDTH - 5}px`,
                listStyle: 'none',
              }}
            >
              {items.map((item) => {
                let active = false;
                if (item.path === '/') {
                  active = pathname === item.path;
                } else {
                  active =
                    item.path &&
                    pathname !== '/' &&
                    pathname.includes(item.path);
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
                    onItemClicked={handleTopNavClick}
                  />
                );
              })}
            </div>
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small" style={{ color: '#FFF' }}>
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="primary">
                <Badge badgeContent={4} variant="dot">
                  <SvgIcon fontSize="small" style={{ color: '#FFF' }}>
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
            >
              <PersonIcon />
            </Avatar>
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

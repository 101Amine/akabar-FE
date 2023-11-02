import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from 'src/hocs/with-auth-guard';
import { SideNav } from './side-nav';
import { TopNav } from './top-nav';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useDispatch, useSelector } from 'react-redux';
import { toggleIconOnly } from '../../redux/uiSlice';
import { menuItems } from './config';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%',
});

export const Layout = withAuthGuard((props) => {
  const { children, isComingSoon } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [activeTopNavItem, setActiveTopNavItem] = useState(() => {
    const path = window.location.pathname.split('/')[1];
    return path || null;
  });
  const isIconOnly = useSelector((state) => state.ui.isIconOnly);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  const activeItems = menuItems[activeTopNavItem];

  return (
    <>
      <TopNav
        onNavOpen={() => setOpenNav(true)}
        setActiveTopNavItem={setActiveTopNavItem}
        isIconOnly={isIconOnly}
      />
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
        submenuItems={activeItems || []}
        isIconOnly={isIconOnly}
      />
      <LayoutRoot>
        <LayoutContainer
          sx={
            isComingSoon
              ? {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              : {}
          }
        >
          {children}
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});

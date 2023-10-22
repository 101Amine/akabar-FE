  import { useCallback, useEffect, useState } from 'react';
  import { usePathname } from 'next/navigation';
  import { styled } from '@mui/material/styles';
  import { withAuthGuard } from 'src/hocs/with-auth-guard';
  import { SideNav } from './side-nav';
  import { TopNav } from './top-nav';
  import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
  import CreateIcon from '@mui/icons-material/Create';
  const SIDE_NAV_WIDTH = 280;

  const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: SIDE_NAV_WIDTH
    }
  }));

  const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
  });


  const menuItems = {
    users: [
      { label: 'List users', path: '/users', icon: FormatListBulletedIcon },
      { label: 'Create user', path: '/users/createUser', icon: CreateIcon },
    ],
    clients: [
      { label: 'List clients', path: '/clients', icon: FormatListBulletedIcon},
      { label: 'Create client', path: '/clients/createClient', icon: CreateIcon },
    ],

    affaires: [
      { label: 'List affaires', path: '/affaires', icon: FormatListBulletedIcon},
      { label: 'Create affaire', path: '/affaires/createAffaire', icon: CreateIcon },
    ],
  };

  export const Layout = withAuthGuard((props) => {
    const { children, isComingSoon } = props;
    const pathname = usePathname();
    const [openNav, setOpenNav] = useState(false);
    const [activeTopNavItem, setActiveTopNavItem] = useState(() => {
      const path = window.location.pathname.split('/')[1];
      return path || null;
    });

    const handlePathnameChange = useCallback(
      () => {
        if (openNav) {
          setOpenNav(false);
        }
      },
      [openNav]
    );

    useEffect(
      () => {
        handlePathnameChange();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [pathname]
    );

    const activeItems = menuItems[activeTopNavItem];

    return (
      <>
        <TopNav onNavOpen={() => setOpenNav(true)} setActiveTopNavItem={setActiveTopNavItem} />
        <SideNav
          onClose={() => setOpenNav(false)}
          open={openNav}
          submenuItems={activeItems || []}
        />
        <LayoutRoot>
          <LayoutContainer
            sx={isComingSoon ? {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            } : {}}
          >
            {children}
          </LayoutContainer>
        </LayoutRoot>
      </>
    );
  });

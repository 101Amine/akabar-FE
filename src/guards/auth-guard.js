import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

export const AuthGuard = (props) => {
  const { children } = props;
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (ignore.current) {
      return;
    }

    ignore.current = true;

    if (!isAuthenticated && router.asPath === '/') {
      console.log('Not authenticated or accessing root, redirecting');
      router.replace('/auth/login').catch(console.error);
    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated, router.asPath]);

  if (!checked) {
    return null;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

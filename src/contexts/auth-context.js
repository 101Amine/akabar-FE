import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, signIn, signOut } from '../redux/authSlice';

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleSignIn = useCallback(
    async (username, password) => {
      try {
        await dispatch(signIn({ username, password }));
      } catch (err) {
        console.error('Failed to authenticate:', err.message);
      }
    },
    [dispatch],
  );

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          handleSignIn,
          handleSignOut,
          isAuthenticated,
        }),
        [handleSignIn, handleSignOut, isAuthenticated],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);

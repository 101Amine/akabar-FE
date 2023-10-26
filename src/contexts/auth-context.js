import { createContext, useContext, useEffect } from 'react';
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
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleSignIn = async (username, password) => {
    try {
      await dispatch(signIn({ username, password }));
    } catch (err) {
      console.error('Failed to authenticate:', err.message);
    }
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <AuthContext.Provider
      value={{
        handleSignIn,
        handleSignOut,
        isAuthenticated,
      }}
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

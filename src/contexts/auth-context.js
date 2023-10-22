import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { fetchWithHeaders, fetchWithHeadersLogin } from '../utils/api';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    try {
      const user = await fetchWithHeaders('/user/info');
      dispatch({ type: HANDLERS.INITIALIZE, payload: user });
    } catch (error) {
      console.error(error);
      window.localStorage.removeItem('token');
      dispatch({ type: HANDLERS.INITIALIZE });
    }
  };

  useEffect(() => {
    initialize();
  }, []);


  const signIn = async (email, password) => {
    console.log("logging in")
    try {
      const data = await fetchWithHeadersLogin('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
      });

      console.log("data",data);
      dispatch({ type: HANDLERS.SIGN_IN, payload: data.user });
    } catch (error) {
      console.error('error singnIn',error);
      throw new Error(`Failed to authenticate: ${error.message}`);
    }
  };


  const signOut = () => {
    dispatch({ type: HANDLERS.SIGN_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);

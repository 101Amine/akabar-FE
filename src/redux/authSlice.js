import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../utils/authAPI';

const isBrowser = typeof window !== 'undefined';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.validateToken();
      if (response === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        return true;
      } else {
        localStorage.removeItem('isAuthenticated');
        return false;
      }
    } catch (error) {
      localStorage.removeItem('isAuthenticated');
      return rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.loginUser(credentials);
      if (response) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem(
          'userName',
          `${response.claims.firstName} ${response.claims.lastName}`,
        );
        return response.claims;
      } else {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.logoutUser();
      if (response === 200) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        return;
      } else {
        throw new Error('Sign out failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    isAuthenticated: isBrowser
      ? localStorage.getItem('isAuthenticated') === 'true'
      : false,
    name: isBrowser ? localStorage.getItem('userName') || '' : '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.name = `${action.payload.firstName} ${action.payload.lastName}`;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

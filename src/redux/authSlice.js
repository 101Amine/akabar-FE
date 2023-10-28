import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../utils/authAPI';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  authAPI.validateToken,
);

export const signOut = createAsyncThunk(
  'auth/signOutAsync',
  authAPI.logoutUser,
);

export const signIn = createAsyncThunk('auth/signIn', authAPI.loginUser);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    name: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.error = 'validating Token failed';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.name = `${action.payload.claims.firstName} ${action.payload.claims.lastName}`;
      })
      .addCase(signIn.rejected, (state) => {
        state.isAuthenticated = false;
        state.error = 'signIn rejected, please try again..';
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(signOut.rejected, (state) => {
        state.isAuthenticated = true;
        state.error = 'signOut rejected, please try again..';
      });
  },
});

export default authSlice.reducer;

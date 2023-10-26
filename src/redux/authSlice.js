import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../utils/authAPI';

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  authAPI.validateToken,
);

export const signIn = createAsyncThunk('auth/signIn', authAPI.loginUser);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
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
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state) => {
        console.log('rejecting signIn....');
        state.isAuthenticated = false;
        state.error = 'signIn rejected, please try again..';
      });
  },
});

export default authSlice.reducer;
export const { signOut } = authSlice.actions;

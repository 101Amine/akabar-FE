// userSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';


/**
 * @typedef {Object} UserDetails
 * @property {string} firstName - The user's firstName.
 * @property {string} lastName - The user's lastName.
 * @property {string} password - The user's password.
 * @property {string} email - the user's email
 * @property {string} mobilePhoneNumber - the user's phoneNumber
 */
export const addUser = createAsyncThunk(
  'user/addUser',
  /**
   * @param {UserDetails} UserDetails
   */
  async (UserDetails) => {
    return await fetchWithHeaders(`/users/staff/add`, {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    });
  }
);


export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, { getState }) => {
    console.log("getState",getState)
    const { page, rowsPerPage } = getState().user;
    const response = await fetchWithHeaders(`/users/staff/list?offset=${page * rowsPerPage}&limit=${rowsPerPage}`, {
      method: 'POST',
      body: JSON.stringify({
        searchFilter: {},
        offset: page * rowsPerPage,
        limit: rowsPerPage
      }),
    });

    console.log(".................",response)
    if (response.status !== 200) {
      throw new Error('Failed to fetch users');
    }
    return response.content;
  }
);

const initialState = {
  userDetails: {
    userName: '',
    password: '',
    phoneNumber: '',
    email: ''
  },
  users: [],
  page: 0,
  rowsPerPage: 5,
  totalUsers: 0,
  fetching: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    clearUserDetails: (state) => {
      state.userDetails = initialState.userDetails;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      }).addCase(fetchUsers.pending, (state) => {
      state.fetching = true;
      state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetching = false;
        state.users = action.payload.currentPageData || [];
        state.totalUsers = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error;
      });
  },
});

export const { setUserDetails, clearUserDetails, setPage, setRowsPerPage } = userSlice.actions;

export default userSlice.reducer;

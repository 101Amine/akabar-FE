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
  },
);

export const blockUser = createAsyncThunk(
  'user/blockUser',
  async (idOrEmail) => {
    const payload = {
      active: false,
      ...(typeof idOrEmail === 'string' && { email: idOrEmail }),
    };
    return await fetchWithHeaders('/users/profile', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
);

export const unblockUser = createAsyncThunk(
  'user/unblockUser',
  async (idOrEmail) => {
    const payload = {
      active: true,
      ...(typeof idOrEmail === 'string' && { email: idOrEmail }),
    };
    return await fetchWithHeaders('/users/profile', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
);

/**
 * @typedef {Object} UserUpdateDetails
 * @property {string} firstName - The user's firstName.
 * @property {string} lastName - The user's lastName.
 * @property {string} email - the user's email
 * @property {string} mobilePhoneNumber - the user's phoneNumber
 */
export const updateUser = createAsyncThunk(
  'user/updateUser',
  /**
   * @param {UserUpdateDetails} UserUpdateDetails
   */
  async (UserUpdateDetails) => {
    return await fetchWithHeaders(`/users/profile`, {
      method: 'POST',
      body: JSON.stringify(UserUpdateDetails),
    });
  },
);

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (searchFilter = {}, { getState }) => {
    const { page, rowsPerPage } = getState().user;

    const response = await fetchWithHeaders(
      `/users/staff/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
      {
        method: 'POST',
        body: JSON.stringify(searchFilter),
      },
    );

    return response.content;
  },
);

const initialState = {
  userDetails: {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    mobilePhoneNumber: '',
  },
  users: [],
  page: 0,
  totalPages: 1,
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
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
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
      })
      .addCase(fetchUsers.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetching = false;
        state.users = action.payload.currentPageData || [];
        state.totalUsers = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error;
      })
      .addCase(blockUser.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
        // Update the user's active status in the state
        const user = state.users.find(
          (user) =>
            user.id === action.meta.arg || user.email === action.meta.arg,
        );
        if (user) {
          user.active = false;
        }
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(unblockUser.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
        // Update the user's active status in the state
        const user = state.users.find(
          (user) =>
            user.id === action.meta.arg || user.email === action.meta.arg,
        );
        if (user) {
          user.active = true;
        }
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      });
  },
});

export const { setUserDetails, clearUserDetails, setPage, setRowsPerPage } =
  userSlice.actions;

export default userSlice.reducer;

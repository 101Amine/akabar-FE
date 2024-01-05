import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';
import { findOneEntity } from './utils/findOneEntity';

// Initial state
const initialState = {
  clientDetails: {
    nameClient: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    mobilePhoneNumber: '',
    phone: '',
    fax: '',
    ice: '',
    bankAccount: '',
  },
  clients: [],
  page: 0,
  rowsPerPage: 5,
  totalPages: 1,
  totalClients: 0,
  submitting: false,
  error: null,
  success: false,
};

/**
 * @typedef {Object} ClientDetails
 * @property {string} nameClient - The client's name.
 * @property {string} codeClient - The client's code.
 * @property {string} ice - the client's ice
 * @property {number} phone - the client's phone
 * @property {string} fax - the client's fax
 * @property {string} bankAccount - the client's bankAccount
 * @property {string} address - the client's address
 */
export const addClient = createAsyncThunk(
  'client/addClient',
  /**
   * @param {ClientDetails} clientDetails
   */
  async (clientDetails) => {
    return await fetchWithHeaders(`/users/client/add`, {
      method: 'POST',
      body: JSON.stringify(clientDetails),
    });
  },
);

/**
 * @typedef {Object} ClientUpdateDetails
 * @property {string} firstName - the client's firstName
 * @property {string} lastName - the client's lastName
 * @property {number} email - the client's mobilePhoneNumber
 * @property {number} phone - the client's phone
 */
export const updateClient = createAsyncThunk(
  'client/updateClient',
  /**
   * @param {ClientUpdateDetails} ClientUpdateDetails
   */
  async (ClientUpdateDetails) => {
    const response = await fetchWithHeaders(`/users/profile`, {
      method: 'POST',
      body: JSON.stringify(ClientUpdateDetails),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update client. Please try again.');
    }
    return response.json();
  },
);

export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async (searchFilter = {}, { getState }) => {
    const { page, rowsPerPage } = getState().client;

    const response = await fetchWithHeaders(
      `/users/client/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
      {
        method: 'POST',
        body: JSON.stringify(searchFilter),
      },
    );

    return response.content;
  },
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
    clearClientDetails: (state) => {
      state.clientDetails = initialState.clientDetails;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClient.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addClient.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addClient.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(fetchClients.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.fetching = false;
        state.clients = action.payload.currentPageData || [];
        state.totalClients = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.fetching = false;
        state.error = 'error while fetching clients';
      })
      .addCase(updateClient.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      })
      .addCase(findOneEntity.fulfilled, (state, action) => {
        state.clientDetails = action.payload;
      })
      .addCase(findOneEntity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const {
  setClientDetails,
  clearClientDetails,
  setPage,
  setRowsPerPage,
  setOffset,
} = clientSlice.actions;

export default clientSlice.reducer;

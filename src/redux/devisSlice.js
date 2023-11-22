import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';

// Initial state for devis
const initialState = {
  devisDetails: {
    numero: '',
    date: '',
    name: '',
    agent: '',
    netAPayer: '',
    status: '',
  },
  devis: [],
  page: 0,
  rowsPerPage: 5,
  totalPages: 1,
  totalDevis: 0,
  submitting: false,
  error: null,
  success: false,
};

/**
 * @typedef {Object} DevisDetails
 * @property {string} numero - The quote number.
 * @property {string} date - The date of the quote.
 * @property {string} nomClient - The name of the client.
 * @property {string} agent - The agent handling the quote.
 * @property {number} netAPayer - The net amount to be paid.
 * @property {string} status - The status of the quote.
 */
export const addDevis = createAsyncThunk(
  'devis/addDevis',
  async (devisDetails) => {
    return await fetchWithHeaders(`/devis/add`, {
      method: 'POST',
      body: JSON.stringify(devisDetails),
    });
  },
);

export const updateDevis = createAsyncThunk(
  'devis/updateDevis',
  async (devisDetails) => {
    const response = await fetchWithHeaders(`/devis/update`, {
      method: 'POST',
      body: JSON.stringify(devisDetails),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update devis. Please try again.');
    }
    return response.json();
  },
);

export const fetchDevis = createAsyncThunk(
  'devis/fetchDevis',
  async (searchFilter = {}, { getState }) => {
    const { page, rowsPerPage } = getState().devis;

    const response = await fetchWithHeaders(
      `/devis/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
      {
        method: 'POST',
        body: JSON.stringify(searchFilter),
      },
    );

    return response.content;
  },
);

const devisSlice = createSlice({
  name: 'devis',
  initialState,
  reducers: {
    setDevisDetails: (state, action) => {
      state.devisDetails = action.payload;
    },
    clearDevisDetails: (state) => {
      state.devisDetails = initialState.devisDetails;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDevis.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addDevis.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addDevis.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(fetchDevis.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchDevis.fulfilled, (state, action) => {
        state.fetching = false;
        state.devis = action.payload.currentPageData || [];
        state.totalDevis = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDevis.rejected, (state) => {
        state.fetching = false;
        state.error = 'Error while fetching devis';
      })
      .addCase(updateDevis.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateDevis.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(updateDevis.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      });
  },
});

export const { setDevisDetails, clearDevisDetails, setPage, setRowsPerPage } =
  devisSlice.actions;

export default devisSlice.reducer;

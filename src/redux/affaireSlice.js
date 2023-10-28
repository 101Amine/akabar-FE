import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';

export const addAffaire = createAsyncThunk(
  'affaire/addAffaire',
  async (affaireDetails) => {
    return await fetchWithHeaders(`/affaires/add`, {
      method: 'POST',
      body: JSON.stringify(affaireDetails),
    });
  },
);

export const updateAffaire = createAsyncThunk(
  'affaire/updateAffaire',
  async (affaireUpdateDetails) => {
    const response = await fetchWithHeaders(`/affaires/update`, {
      method: 'POST',
      body: JSON.stringify(affaireUpdateDetails),
    });
    if (response.status !== 200) {
      throw new Error('Failed to update affaire. Please try again.');
    }
    return response.json();
  },
);

export const fetchAffaires = createAsyncThunk(
  'affaire/fetchAffaires',
  async () => {
    const response = await fetchWithHeaders(`/affaires/list`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch affaires');
    }
    return response.content;
  },
);

// Initial state
const initialState = {
  affaireDetails: {
    nameClient: '',
    nomEtiquette: '',
    width: '',
    height: '',
    quantiteUnitaire: '',
    supportPapier: '',
    typeEtiquette: '',
  },
  affaires: [],
  page: 0,
  rowsPerPage: 10,
  totalAffaires: 0,
  submitting: false,
  error: null,
  success: false,
};

// Create the affaire slice
const affaireSlice = createSlice({
  name: 'affaire',
  initialState,
  reducers: {
    setAffaireDetails: (state, action) => {
      state.affaireDetails = action.payload;
    },
    clearAffaireDetails: (state) => {
      state.affaireDetails = initialState.affaireDetails;
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
      .addCase(addAffaire.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addAffaire.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addAffaire.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(fetchAffaires.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchAffaires.fulfilled, (state, action) => {
        state.fetching = false;
        state.affaires = action.payload || [];
        state.totalAffaires = action.payload.length;
      })
      .addCase(fetchAffaires.rejected, (state, action) => {
        state.fetching = false;
        state.error = 'error while fetching affaires';
      })
      .addCase(updateAffaire.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateAffaire.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(updateAffaire.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setAffaireDetails,
  clearAffaireDetails,
  setPage,
  setRowsPerPage,
} = affaireSlice.actions;

export default affaireSlice.reducer;

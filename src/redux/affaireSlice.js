import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';

const initialState = {
  affaireDetails: {
    clientId: null,
    clientName: null,
    date: null,
    name: '',
    productType: null,
    type: null,
    quantiteUnitaire: null,
    laize: null,
    developpe: null,
    supportPapier: null,
    forme: null,
    avecImpression: false,
    impressionSide: null,
    colorNumber: null,
    etiquetteModel: '',
    lienAudio: '',
    texteInformatif: '',
    sortieDirection: null,
    repiquage: false,
    vernis: false,
    dorure: false,
    plasification: false,
    existanceDeRayonDeCoin: false,
    mandrin: null,
    poseEtiquette: null,
    nbrEtqParBobine: null,
    nbrEtqDeFront: null,
    formeDeDecoupeId: null,
    clicheId: null,
    active: null,
  },
  affaires: [],
  page: 0,
  rowsPerPage: 5,
  totalPages: 1,
  totalAffaires: 0,
  submitting: false,
  error: null,
  success: false,
};

export const addAffaire = createAsyncThunk(
  'affaire/addAffaire',
  async (affaireDetails) => {
    return await fetchWithHeaders(`/affaires/add`, {
      method: 'POST',
      body: JSON.stringify(affaireDetails),
    });
  },
);

export const fetchAffaires = createAsyncThunk(
  'affaire/fetchAffaires',
  async (searchFilter = {}, { getState }) => {
    const { page, rowsPerPage } = getState().affaire;

    const response = await fetchWithHeaders(
      `/affaires/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
      {
        method: 'POST',
        body: JSON.stringify(searchFilter),
      },
    );

    console.log('response', response);
    return response.content;
  },
);

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
        state.loading = true;
        state.error = null;
      })
      .addCase(addAffaire.fulfilled, (state) => {
        state.submitting = false;
        state.loading = false;
        state.success = true;
      })
      .addCase(addAffaire.rejected, (state, action) => {
        state.submitting = false;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAffaires.pending, (state) => {
        state.submitting = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAffaires.fulfilled, (state, action) => {
        state.submitting = false;
        state.loading = false;
        state.affaires = action.payload.currentPageData || [];
        state.totalAffaires = action.payload.currentPageData.totalElements;
        // state.totalPages = Math.ceil(action.payload.length / state.rowsPerPage);
      })
      .addCase(fetchAffaires.rejected, (state, action) => {
        state.submitting = false;
        state.loading = false;
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

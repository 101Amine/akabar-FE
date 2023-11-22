import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';

// Initial state
const initialState = {
  articleDetails: {
    code: '',
    name: '',
    famille: '',
    prixHT: '',
    unite: '',
  },
  articles: [],
  page: 0,
  rowsPerPage: 5,
  totalPages: 1,
  totalClients: 0,
  submitting: false,
  error: null,
  success: false,
};

/**
 * @typedef {Object} articleDetails
 * @property {string} code - The article's name.
 * @property {string} name - The article's code.
 * @property {string} famille - the article's famille
 * @property {number} prixHT - the article's prixHT
 * @property {string} unite - the article's unite
 */
export const addArticle = createAsyncThunk(
  'client/addArticle',
  /**
   * @param {articleDetails} articleDetails
   */
  async (articleDetails) => {
    return await fetchWithHeaders(`/users/client/add`, {
      method: 'POST',
      body: JSON.stringify(articleDetails),
    });
  },
);

/**
 * @typedef {Object} articleUpdateDetails
 * @property {string} code - The article's name.
 * @property {string} name - The article's code.
 * @property {string} famille - the article's famille
 * @property {number} prixHT - the article's prixHT
 * @property {string} unite - the article's unite
 */
export const updateArticle = createAsyncThunk(
  'client/updateArticle',
  /**
   * @param {articleUpdateDetails} articleUpdateDetails
   */
  async (articleUpdateDetails) => {
    const response = await fetchWithHeaders(`/users/profile`, {
      method: 'POST',
      body: JSON.stringify(articleUpdateDetails),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update article. Please try again.');
    }
    return response.json();
  },
);

export const fetchArticles = createAsyncThunk(
  'client/fetchArticles',
  async (searchFilter = {}, { getState }) => {
    const { page, rowsPerPage } = getState().article;

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

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleDetails: (state, action) => {
      state.articleDetails = action.payload;
    },
    clearArticleDetails: (state) => {
      state.articleDetails = initialState.articleDetails;
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
      .addCase(addArticle.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addArticle.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(fetchArticles.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.fetching = false;
        state.articles = action.payload.currentPageData || [];
        state.totalArticles = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.fetching = false;
        state.error = 'error while fetching clients';
      })
      .addCase(updateArticle.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setArticleDetails,
  clearArticleDetails,
  setPage,
  setRowsPerPage,
  setOffset,
} = articleSlice.actions;

export default articleSlice.reducer;

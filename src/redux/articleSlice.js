import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';
import { findOneEntity } from './utils/findOneEntity';

const API_PREFIX = '/stock/product';

// Initial state
const initialState = {
  articleDetails: {
    code: '',
    designation: '',
    family: '',
    priceHT: '',
    unite: '',
  },
  articles: [],
  families: [],
  units: [],
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
  'stock/addArticle',
  /**
   * @param {articleDetails} articleDetails
   */
  async (articleDetails) => {
    return await fetchWithHeaders(`${API_PREFIX}/add`, {
      method: 'POST',
      body: JSON.stringify(articleDetails),
    });
  },
);

export const getArticleFamilies = createAsyncThunk(
  'stock/getArticleFamilies',
  async () => {
    return await fetchWithHeaders(`${API_PREFIX}/classifications`, {
      method: 'GET',
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
  'stock/updateArticle',
  /**
   * @param {articleUpdateDetails} articleUpdateDetails
   */
  async (articleUpdateDetails) => {
    const response = await fetchWithHeaders(`${API_PREFIX}/update`, {
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
  'stock/fetchArticles',
  async (searchFilter, { getState }) => {
    const { page, rowsPerPage } = getState().article;

    const response = await fetchWithHeaders(
      `${API_PREFIX}/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
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

        console.log('action payload', action.payload);
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
      })
      .addCase(getArticleFamilies.fulfilled, (state, action) => {
        const { families, units } = action.payload.content;
        state.families = families;
        state.units = units;
      })
      .addCase(getArticleFamilies.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(findOneEntity.fulfilled, (state, action) => {
        state.articleDetails = action.payload;
      })
      .addCase(findOneEntity.rejected, (state, action) => {
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

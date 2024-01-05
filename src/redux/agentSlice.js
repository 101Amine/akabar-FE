import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../utils/api';
import { findOneEntity } from './utils/findOneEntity';

const API_PREFIX = '/agent';

// Initial state for agents
const initialState = {
  agentDetails: {
    code: '',
    name: '',
  },
  agents: [],
  page: 0,
  rowsPerPage: 5,
  totalPages: 1,
  totalAgents: 0,
  submitting: false,
  error: null,
  success: false,
};

/**
 * @typedef {Object} AgentDetails
 * @property {string} code - The agent's code.
 * @property {string} nomAgent - The agent's name.
 */
export const addAgent = createAsyncThunk(
  'agent/addAgent',
  /**
   * @param {AgentDetails} agentDetails
   */
  async (agentDetails) => {
    return await fetchWithHeaders(`${API_PREFIX}/add`, {
      method: 'POST',
      body: JSON.stringify(agentDetails),
    });
  },
);

export const getAgentDetails = createAsyncThunk(
  'agent/addAgent',
  async (id) => {
    const response = await fetchWithHeaders(`${API_PREFIX}/findOne/${id}`, {
      method: 'POST',
    });

    return response.json();
  },
);

export const updateAgent = createAsyncThunk(
  'agent/updateAgent',
  /**
   * @param {AgentDetails} agentDetails
   */
  async (agentDetails) => {
    const response = await fetchWithHeaders(`${API_PREFIX}/update`, {
      method: 'POST',
      body: JSON.stringify(agentDetails),
    });

    if (response.status !== 200) {
      throw new Error('Failed to update agent. Please try again.');
    }
    return response.json();
  },
);

export const fetchAgents = createAsyncThunk(
  'agent/fetchAgents',
  async (searchFilter, { getState }) => {
    const { page, rowsPerPage } = getState().agent;

    console.log('searchFilter', searchFilter);
    const response = await fetchWithHeaders(
      `${API_PREFIX}/list?offset=${rowsPerPage * page}&limit=${rowsPerPage}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set for JSON
        },
        body: JSON.stringify(searchFilter),
      },
    );

    return response.content;
  },
);

const agentSlice = createSlice({
  name: 'agent',
  initialState,
  reducers: {
    setAgentDetails: (state, action) => {
      state.agentDetails = action.payload;
    },
    clearAgentDetails: (state) => {
      state.agentDetails = initialState.agentDetails;
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
      .addCase(addAgent.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(addAgent.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error;
      })
      .addCase(fetchAgents.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.fetching = false;
        state.agents = action.payload.currentPageData || [];
        state.totalAgents = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAgents.rejected, (state) => {
        state.fetching = false;
        state.error = 'Error while fetching agents';
      })
      .addCase(updateAgent.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(updateAgent.fulfilled, (state) => {
        state.submitting = false;
        state.success = true;
      })
      .addCase(updateAgent.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message;
      })
      .addCase(findOneEntity.fulfilled, (state, action) => {
        state.agentDetails = action.payload;
      })
      .addCase(findOneEntity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setAgentDetails, clearAgentDetails, setPage, setRowsPerPage } =
  agentSlice.actions;

export default agentSlice.reducer;

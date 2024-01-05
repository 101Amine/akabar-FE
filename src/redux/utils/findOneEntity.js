import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWithHeaders } from '../../utils/api';

export const findOneEntity = createAsyncThunk(
  'common/findOneEntity',
  async ({ entityType, id, url }) => {
    const response = await fetchWithHeaders(`${url}?Id=${id}`, {
      method: 'GET',
    });

    if (response.status !== 200) {
      throw new Error(
        `Failed to get ${entityType} with ID ${id}. Please try again.`,
      );
    }

    return response.content;
  },
);

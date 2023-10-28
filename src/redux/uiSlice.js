import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isIconOnly: true,
  },
  reducers: {
    setIconOnly: (state) => {
      state.isIconOnly = false;
    },
    disableIconOnly: (state) => {
      state.isIconOnly = true;
    },
  },
});

export const { setIconOnly, disableIconOnly } = uiSlice.actions;
export default uiSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (_, action: PayloadAction<string>) => action.payload,
    cleanError: () => initialState,
  },
  selectors: {
    selectError: sliceState => sliceState,
  },
});

export const errorReducer = errorSlice.reducer;
export const { setError, cleanError } = errorSlice.actions;
export const { selectError } = errorSlice.selectors;

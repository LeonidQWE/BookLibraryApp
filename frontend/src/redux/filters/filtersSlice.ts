import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiltersTypes } from 'types';

const initialState: FiltersTypes = {
  filteredTitle: '',
  filteredAuthor: '',
  showOnlyFavorites: false,
};

const filtersSlice = createSlice({
  name: '@@filters',
  initialState,
  reducers: {
    changeFilterTitle: (state, action: PayloadAction<string>) => {
      state.filteredTitle = action.payload;
    },
    changeFilterAuthor: (state, action: PayloadAction<string>) => {
      state.filteredAuthor = action.payload;
    },
    toggleShowOnlyFavorites: (state, action: PayloadAction<boolean>) => {
      state.showOnlyFavorites = action.payload;
    },
    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  changeFilterTitle,
  changeFilterAuthor,
  toggleShowOnlyFavorites,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './filters/reducer';
import { booksReducer } from './books/bookSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

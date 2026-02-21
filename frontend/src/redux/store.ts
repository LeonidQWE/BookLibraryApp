import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './books/bookSlice';
import { filtersReducer } from './filters/filtersSlice';
import { errorReducer } from './error/errorSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

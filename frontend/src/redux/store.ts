import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './books/reducer';
import { filtersReducer } from './filters/reducer';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

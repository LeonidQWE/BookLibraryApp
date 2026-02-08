import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from 'redux/books/bookSlice';
import { filtersReducer } from 'redux/filters/filtersSlice';
import { RootState } from 'redux/store';

export const makeWrapper = (preloadedState?: RootState) => {
  const store = configureStore({
    reducer: { books: booksReducer, filters: filtersReducer },
    preloadedState: preloadedState ?? {
      books: [],
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );
};

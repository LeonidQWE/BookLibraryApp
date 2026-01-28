import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookType } from 'types';

const initialState: BookType[] = [];

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookType>) => {
      state.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      return state.filter(book => book.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      return state.map(book =>
        book.id === action.payload ?
          { ...book, isFavorite: !book.isFavorite }
        : book
      );
    },
  },
  selectors: {
    selectBooks: sliceState => sliceState,
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;
export const { selectBooks } = bookSlice.selectors;
export const booksReducer = bookSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBook } from './asyncActions/fetchBook';
import { BookType } from 'types';
import { getNewBook } from 'utils/getNewBook';

type InitialStateType = {
  books: BookType[];
  bookLoading: boolean;
};

const initialState: InitialStateType = {
  books: [],
  bookLoading: false,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<BookType>) => {
      state.books.push(action.payload);
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload ?
            { ...book, isFavorite: !book.isFavorite }
          : book
        ),
      };
    },
  },
  selectors: {
    selectBooks: sliceState => sliceState.books,
    selectBookLoading: sliceState => sliceState.bookLoading,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBook.pending, state => {
        state.bookLoading = true;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        if (action.payload?.title && action.payload?.author) {
          state.books.push(getNewBook(action.payload, 'API'));
          state.bookLoading = false;
        }
      })
      .addCase(fetchBook.rejected, state => {
        state.bookLoading = false;
      });
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;
export const { selectBooks, selectBookLoading } = bookSlice.selectors;
export const booksReducer = bookSlice.reducer;

import { BookType } from 'types';
import { BOOK_ACTION_TYPES } from './actionTypes';

export const addBook = (newBook: BookType) => ({
  type: BOOK_ACTION_TYPES.ADD_BOOK,
  payload: newBook,
});

export const deleteBook = (id: string) => ({
  type: BOOK_ACTION_TYPES.DELETE_BOOK,
  payload: id,
});

export const toggleFavorite = (id: string) => ({
  type: BOOK_ACTION_TYPES.TOGGLE_FAVORITE,
  payload: id,
});

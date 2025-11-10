import { BookType } from 'types';
import { BOOK_ACTION_TYPES } from './actionTypes';

export const addBook = (newBook: BookType) => ({
  type: BOOK_ACTION_TYPES.ADD_BOOK,
  payload: newBook,
});

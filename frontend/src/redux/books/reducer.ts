import { BookType } from 'types';
import { BOOK_ACTION_TYPES } from './actionTypes';
import { UnknownAction } from '@reduxjs/toolkit';

const initialState: BookType[] = [];

export const booksReducer = (
  state = initialState,
  action: UnknownAction
): BookType[] => {
  switch (action.type) {
    case BOOK_ACTION_TYPES.ADD_BOOK:
      if (action.payload) {
        return [...state, action.payload as BookType];
      }
      return state;
    case BOOK_ACTION_TYPES.DELETE_BOOK:
      return state.filter(book => book.id !== action.payload);
    case BOOK_ACTION_TYPES.TOGGLE_FAVORITE:
      return state.map(book =>
        book.id === action.payload ?
          { ...book, isFavorite: !book.isFavorite }
        : book
      );
    default:
      return state;
  }
};

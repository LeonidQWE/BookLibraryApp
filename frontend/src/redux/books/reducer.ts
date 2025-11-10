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
    default:
      return state;
  }
};

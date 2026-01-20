import { UnknownAction } from '@reduxjs/toolkit';
import { FILTER_ACTION_TYPES } from './actionTypes';
import { FiltersTypes } from 'types';

const initialState: FiltersTypes = {
  filteredTitle: '',
  filteredAuthor: '',
  showOnlyFavorites: false,
};

export const filtersReducer = (
  state = initialState,
  action: UnknownAction
): FiltersTypes => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.CHANGE_FILTER_TITLE:
      return { ...state, filteredTitle: action.payload } as FiltersTypes;
    case FILTER_ACTION_TYPES.CHANGE_FILTER_AUTHOR:
      return { ...state, filteredAuthor: action.payload } as FiltersTypes;
    case FILTER_ACTION_TYPES.SHOW_ONLY_FAVORITES:
      return { ...state, showOnlyFavorites: action.payload } as FiltersTypes;
    case FILTER_ACTION_TYPES.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};

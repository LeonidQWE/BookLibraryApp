import { UnknownAction } from '@reduxjs/toolkit';
import { FILTER_ACTION_TYPES } from './actionTypes';
import { FiltersTypes } from 'types';

const initialState = {
  filteredTitle: '',
};

export const filtersReducer = (
  state = initialState,
  action: UnknownAction
): FiltersTypes => {
  switch (action.type) {
    case FILTER_ACTION_TYPES.CHANGE_FILTER_TITLE:
      return { filteredTitle: action.payload } as FiltersTypes;
    case FILTER_ACTION_TYPES.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
};

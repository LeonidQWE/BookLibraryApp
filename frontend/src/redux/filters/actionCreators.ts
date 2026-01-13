import { FILTER_ACTION_TYPES } from './actionTypes';

export const changeFilterTitle = (title: string) => ({
  type: FILTER_ACTION_TYPES.CHANGE_FILTER_TITLE,
  payload: title,
});

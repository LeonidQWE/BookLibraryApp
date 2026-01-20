import { FILTER_ACTION_TYPES } from './actionTypes';

export const changeFilterTitle = (title: string) => ({
  type: FILTER_ACTION_TYPES.CHANGE_FILTER_TITLE,
  payload: title,
});

export const changeFilterAuthor = (author: string) => ({
  type: FILTER_ACTION_TYPES.CHANGE_FILTER_AUTHOR,
  payload: author,
});

export const toggleShowOnlyFavorites = (checked: boolean) => ({
  type: FILTER_ACTION_TYPES.SHOW_ONLY_FAVORITES,
  payload: checked,
});

export const resetFilters = () => ({
  type: FILTER_ACTION_TYPES.RESET_FILTERS,
});

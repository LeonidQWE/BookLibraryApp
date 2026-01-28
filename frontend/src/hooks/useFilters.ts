import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeFilterTitle,
  changeFilterAuthor,
  toggleShowOnlyFavorites,
  resetFilters,
  selectFilteredTitle,
  selectFilteredAuthor,
  selectShowOnlyFavorites,
} from 'redux/filters/filtersSlice';

export const useFilters = () => {
  const filteredTitle = useAppSelector(selectFilteredTitle);
  const filteredAuthor = useAppSelector(selectFilteredAuthor);
  const showOnlyFavorites = useAppSelector(selectShowOnlyFavorites);

  const dispatch = useAppDispatch();

  const setFilteredTitle = (value: string) =>
    dispatch(changeFilterTitle(value));

  const setFiltereAuthor = (value: string) =>
    dispatch(changeFilterAuthor(value));

  const setShowOnlyFavorites = (value: boolean) =>
    dispatch(toggleShowOnlyFavorites(value));

  const deleteFilters = () => {
    dispatch(resetFilters());
  };

  return {
    filteredTitle,
    filteredAuthor,
    showOnlyFavorites,
    setFilteredTitle,
    setFiltereAuthor,
    setShowOnlyFavorites,
    deleteFilters,
  };
};

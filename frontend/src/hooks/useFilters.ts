import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeFilterTitle,
  changeFilterAuthor,
  toggleShowOnlyFavorites,
  resetFilters,
} from 'redux/filters/filtersSlice';

export const useFilters = () => {
  const { filteredTitle, filteredAuthor, showOnlyFavorites } = useAppSelector(
    state => state.filters
  );
  const dispatch = useAppDispatch();

  const changeFilteredTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterTitle(e.target.value));
  };

  const changeFilteredAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterAuthor(e.target.value));
  };

  const handleToggleShowOnlyFavorites = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(toggleShowOnlyFavorites(e.target.checked));
  };

  const deleteFilters = () => {
    dispatch(resetFilters());
  };

  return {
    filteredTitle,
    filteredAuthor,
    showOnlyFavorites,
    changeFilteredTitle,
    changeFilteredAuthor,
    handleToggleShowOnlyFavorites,
    deleteFilters,
  };
};

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeFilterTitle,
  changeFilterAuthor,
  resetFilters,
} from 'redux/filters/actionCreators';

export const useFilters = () => {
  const filteredTitle = useAppSelector(state => state.filters.filteredTitle);
  const filteredAuthor = useAppSelector(state => state.filters.filteredAuthor);
  const dispatch = useAppDispatch();

  const changeFilteredTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterTitle(e.target.value));
  };

  const changeFilteredAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterAuthor(e.target.value));
  };

  const deleteFilters = () => {
    dispatch(resetFilters());
  };

  return {
    filteredTitle,
    filteredAuthor,
    changeFilteredTitle,
    changeFilteredAuthor,
    deleteFilters,
  };
};

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeFilterTitle, resetFilters } from 'redux/filters/actionCreators';

export const useFilters = () => {
  const filteredTitle = useAppSelector(state => state.filters.filteredTitle);
  const dispatch = useAppDispatch();

  const changeFilterField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterTitle(e.target.value));
  };

  const deleteFilters = () => {
    dispatch(resetFilters());
  };

  return { filteredTitle, changeFilterField, deleteFilters };
};

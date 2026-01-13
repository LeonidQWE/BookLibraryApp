// import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { changeFilterTitle } from 'redux/filters/actionCreators';

export const useFilters = () => {
  // const [filterTitle, setFilterTitle] = useState('');
  const filteredTitle = useAppSelector(state => state.filters.filteredTitle);
  const dispatch = useAppDispatch();

  const changeFilterField = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFilterTitle(e.target.value));
  };

  return { filteredTitle, changeFilterField };
};

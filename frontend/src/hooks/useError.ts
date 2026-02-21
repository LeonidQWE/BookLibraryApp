import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectError, setError, cleanError } from 'redux/error/errorSlice';

export const useError = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const addError = (error: string) => {
    dispatch(setError(error));
  };

  const removeError = () => {
    dispatch(cleanError());
  };

  return { error, addError, removeError };
};

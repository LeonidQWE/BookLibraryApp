import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectError, cleanError } from 'redux/error/errorSlice';

export const useError = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(cleanError());
    }
  }, [error, dispatch]);

  return { error };
};

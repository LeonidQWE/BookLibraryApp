import { ToastContainer } from 'react-toastify';
import { useError } from 'hooks/useError';
import s from './Error.module.css';

export const Error = () => {
  useError();

  return (
    <ToastContainer position="top-right" autoClose={2000} className={s.error} />
  );
};

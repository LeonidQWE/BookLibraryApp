import { useState } from 'react';

export const useBook = () => {
  const [book, setBook] = useState({ author: '', title: '' });

  const addNewBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(book);
    setBook({ author: '', title: '' });
  };

  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  

  return { book, addNewBook, changeField };
};

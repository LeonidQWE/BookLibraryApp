import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addBook, deleteBook } from 'redux/books/actionCreators';
import { getNewBook } from 'utils/getNewBook';
import { BookType } from 'types';
import booksData from 'data/books.json';

export const useBook = () => {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<BookType>({ id: '', author: '', title: '' });
  const books = useAppSelector(state => state.books);

  const addNewBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (book.author && book.title) {
      const newBook = getNewBook(book);

      dispatch(addBook(newBook));
    }

    setBook({ id: '', author: '', title: '' });
  };

  const addRandomBook = () => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];
    const newBook = getNewBook(randomBook);
    dispatch(addBook(newBook));
  };

  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBook({ ...book, [id]: value });
  };

  const removeBook = (id: string) => {
    dispatch(deleteBook(id));
  };

  return { books, book, addNewBook, changeField, removeBook, addRandomBook };
};

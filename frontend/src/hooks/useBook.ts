import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  addBook,
  deleteBook,
  toggleFavorite,
  selectBooks,
} from 'redux/books/bookSlice';
import {
  selectFilteredAuthor,
  selectFilteredTitle,
  selectShowOnlyFavorites,
} from 'redux/filters/filtersSlice';
import { setError } from 'redux/error/errorSlice';
import { fetchBook } from 'redux/books/asyncActions/fetchBook';
import { getNewBook } from 'utils/getNewBook';
import booksData from 'data/books.json';

export const useBook = () => {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState({
    author: '',
    title: '',
  });
  const books = useAppSelector(selectBooks);
  const filteredTitle = useAppSelector(selectFilteredTitle);
  const filteredAuthor = useAppSelector(selectFilteredAuthor);
  const showOnlyFavorites = useAppSelector(selectShowOnlyFavorites);

  const filteredBooks = books.filter(
    book =>
      book.title
        .toLocaleLowerCase()
        .includes(filteredTitle.toLocaleLowerCase()) &&
      book.author
        .toLocaleLowerCase()
        .includes(filteredAuthor.toLocaleLowerCase()) &&
      (showOnlyFavorites ? book.isFavorite : true)
  );

  const addNewBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!book.author) {
      dispatch(setError('Author field is empty'));
      return;
    }

    if (!book.title) {
      dispatch(setError('Title field is empty'));
      return;
    }

    if (book.author && book.title) {
      const newBook = getNewBook(book, 'New Book');

      dispatch(addBook(newBook));
    }

    setBook({ author: '', title: '' });
  };

  const addRandomBook = () => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];
    const newBook = getNewBook(randomBook, 'Random Book');
    dispatch(addBook(newBook));
  };

  const changeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBook(prev => ({ ...prev, [id]: value }));
  };

  const removeBook = (id: string) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const addRandomBookByAPI = async () => {
    dispatch(fetchBook());
  };

  return {
    filteredBooks,
    book,
    addNewBook,
    changeField,
    removeBook,
    addRandomBook,
    handleToggleFavorite,
    addRandomBookByAPI,
  };
};

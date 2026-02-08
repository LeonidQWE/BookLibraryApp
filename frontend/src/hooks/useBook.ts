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
import { getNewBook } from 'utils/getNewBook';
import { BookType } from 'types';
import booksData from 'data/books.json';

export const useBook = () => {
  const dispatch = useAppDispatch();
  const [book, setBook] = useState<BookType>({
    id: '',
    author: '',
    title: '',
    isFavorite: false,
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

    if (book.author && book.title) {
      const newBook = getNewBook(book);

      dispatch(addBook(newBook));
    }

    setBook({ id: '', author: '', title: '', isFavorite: false });
  };

  const addRandomBook = () => {
    const randomBook = booksData[Math.floor(Math.random() * booksData.length)];
    const newBook = getNewBook(randomBook);
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

  return {
    filteredBooks,
    book,
    addNewBook,
    changeField,
    removeBook,
    addRandomBook,
    handleToggleFavorite,
  };
};

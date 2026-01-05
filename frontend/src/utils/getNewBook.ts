import { BookType } from 'types';

type Book = Omit<BookType, 'id'>;

export const getNewBook = (book: Book): BookType => {
  return {
    ...book,
    id: crypto.randomUUID(),
  };
};

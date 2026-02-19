import { BookType, SourceType } from 'types';

export type Book = Omit<BookType, 'id' | 'isFavorite' | 'source'>;

export const getNewBook = (book: Book, source: SourceType): BookType => {
  return {
    ...book,
    source,
    id: crypto.randomUUID(),
    isFavorite: false,
  };
};

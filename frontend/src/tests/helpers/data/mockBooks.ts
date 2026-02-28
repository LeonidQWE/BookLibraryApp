import { BookType } from 'types';

export const mockBooks: BookType[] = [
  {
    id: '1234-1234=1234-1231',
    title: 'Title1',
    author: 'Author1',
    isFavorite: false,
    source: 'New Book',
  },
  {
    id: '1234-1234=1234-1232',
    title: 'Kinder t',
    author: 'Surf',
    isFavorite: true,
    source: 'Random Book',
  },
  {
    id: '1234-1234=1234-1233',
    title: 'Aloha',
    author: 'Harry',
    isFavorite: false,
    source: 'API',
  },
];

import {
  selectBooks,
  booksReducer,
  addBook,
  deleteBook,
  toggleFavorite,
} from 'redux/books/bookSlice';
import { BookType } from 'types';

const books: BookType[] = [
  {
    id: '1234-2345-1234-1234',
    title: 'Test book1',
    author: 'Test Author1',
    isFavorite: false,
  },
  {
    id: '1234-2345-1234-1235',
    title: 'Test book2',
    author: 'Test Author2',
    isFavorite: true,
  },
];

describe('bookSlise', () => {
  it('should select books from state object', () => {
    const result = selectBooks({ books });

    expect(result).toEqual(books);
  });

  it('should return default state when passed an empty action', () => {
    const result = booksReducer(undefined, { type: '' });
    expect(result).toEqual([]);
  });

  it('should add new book with "addBook" action', () => {
    const action = {
      type: addBook.type,
      payload: {
        id: '1234-2345-1234-1236',
        title: 'Test book3',
        author: 'Test Author3',
        isFavorite: false,
      },
    };

    const result = booksReducer(books, action);

    expect(result[2].title).toBe('Test book3');
    expect(result[2].author).toBe('Test Author3');
    expect(result[2].isFavorite).toBe(false);
  });

  it('should delete book with "deleteBook" action', () => {
    const action = { type: deleteBook.type, payload: '1234-2345-1234-1234' };

    const result = booksReducer(books, action);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe('1234-2345-1234-1235');
    expect(result[0].title).toBe('Test book2');
    expect(result[0].author).toBe('Test Author2');
    expect(result[0].isFavorite).toBe(true);
  });

  it('should toggle isFavorite book with "toggleFavorite" action', () => {
    const action = {
      type: toggleFavorite.type,
      payload: '1234-2345-1234-1235',
    };

    const result = booksReducer(books, action);

    expect(result[0].isFavorite).toBe(false);
    expect(result[1].isFavorite).toBe(false);
  });
});

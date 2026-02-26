import { fetchBook } from 'redux/books/asyncActions/fetchBook';
import {
  selectBooks,
  selectBookLoading,
  booksReducer,
  addBook,
  deleteBook,
  toggleFavorite,
  InitialStateType,
} from 'redux/books/bookSlice';
import { RootState } from 'redux/store';
import { BookByAPI } from 'types';

global.crypto.randomUUID = () => '123-123-123-123-354';

const defaultState: InitialStateType = {
  books: [
    {
      id: '1234-2345-1234-1234',
      title: 'Test book1',
      author: 'Test Author1',
      isFavorite: false,
      source: 'New Book',
    },
    {
      id: '1234-2345-1234-1235',
      title: 'Test book2',
      author: 'Test Author2',
      isFavorite: true,
      source: 'Random Book',
    },
  ],
  bookLoading: false,
};

const makeState = () => JSON.parse(JSON.stringify(defaultState));

describe('bookSlice', () => {
  describe('bookSlice selectors', () => {
    const state: Pick<RootState, 'books'> = {
      books: defaultState,
    };

    it('should select books from state object', () => {
      const result = selectBooks(state);

      expect(result).toEqual(defaultState.books);
    });

    it('should select bookLoading from state object', () => {
      const result = selectBookLoading(state);

      expect(result).toBe(false);
    });
  });

  it('should return default state when passed an empty action', () => {
    const result = booksReducer(undefined, { type: '' });
    expect(result.books).toEqual([]);
    expect(result.bookLoading).toBe(false);
  });

  it('should add new book with "addBook" action', () => {
    const action = {
      type: addBook.type,
      payload: {
        id: '1234-2345-1234-1236',
        title: 'Test book3',
        author: 'Test Author3',
        isFavorite: false,
        source: 'New Book',
      },
    };

    const result = booksReducer(makeState(), action);

    expect(result.books[2].title).toBe('Test book3');
    expect(result.books[2].author).toBe('Test Author3');
    expect(result.books[2].isFavorite).toBe(false);
    expect(result.books[2].source).toBe('New Book');
  });

  it('should delete book with "deleteBook" action', () => {
    const action = { type: deleteBook.type, payload: '1234-2345-1234-1234' };

    const result = booksReducer(makeState(), action);

    expect(result.books.length).toBe(1);
    expect(result.books[0].id).toBe('1234-2345-1234-1235');
    expect(result.books[0].title).toBe('Test book2');
    expect(result.books[0].author).toBe('Test Author2');
    expect(result.books[0].isFavorite).toBe(true);
    expect(result.books[0].source).toBe('Random Book');
  });

  it('should toggle isFavorite book with "toggleFavorite" action', () => {
    const action = {
      type: toggleFavorite.type,
      payload: '1234-2345-1234-1235',
    };

    const result = booksReducer(makeState(), action);

    expect(result.books[0].isFavorite).toBe(false);
    expect(result.books[1].isFavorite).toBe(false);
  });

  describe('fetchBook in book Slice', () => {
    it('should change loadingBook with "fetchBook.pending" action', () => {
      const state = booksReducer(
        makeState(),
        fetchBook.pending('request-id', undefined)
      );

      expect(state.bookLoading).toBe(true);
    });

    it('should change loadingBook with "fetchBook.fulfilled" action with data', () => {
      const book: BookByAPI = {
        title: 'Test title API',
        author: 'Test Author API',
        year: 1234,
      };

      const state = booksReducer(
        makeState(),
        fetchBook.fulfilled(book, 'request-id')
      );

      expect(state).toEqual({
        books: [
          ...defaultState.books,
          {
            ...book,
            id: '123-123-123-123-354',
            source: 'API',
            isFavorite: false,
          },
        ],
        bookLoading: false,
      });
    });

    it('should change loadingBook with "fetchBook.rejected" action', () => {
      const state = booksReducer(
        makeState(),
        fetchBook.rejected(null, 'request-id')
      );

      expect(state.bookLoading).toBe(false);
    });
  });
});

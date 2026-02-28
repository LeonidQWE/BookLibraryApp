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
import { makeCloneData, mockBooks } from 'tests/helpers';
import { BookByAPI } from 'types';

global.crypto.randomUUID = () => '123-123-123-123-354';

const defaultState: InitialStateType = {
  books: makeCloneData(mockBooks),
  bookLoading: false,
};

describe('bookSlice', () => {
  describe('bookSlice selectors', () => {
    const state: Pick<RootState, 'books'> = {
      books: makeCloneData(defaultState),
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
        title: 'Test book4',
        author: 'Test Author4',
        isFavorite: false,
        source: 'New Book',
      },
    };

    const result = booksReducer(makeCloneData(defaultState), action);
    expect(result.books[3].title).toBe('Test book4');
    expect(result.books[3].author).toBe('Test Author4');
    expect(result.books[3].isFavorite).toBe(false);
    expect(result.books[3].source).toBe('New Book');
  });

  it('should delete book with "deleteBook" action', () => {
    const action = { type: deleteBook.type, payload: '1234-1234=1234-1233' };

    const result = booksReducer(makeCloneData(defaultState), action);

    expect(result.books.length).toBe(2);
  });

  it('should toggle isFavorite book with "toggleFavorite" action', () => {
    const action = {
      type: toggleFavorite.type,
      payload: '1234-1234=1234-1233',
    };

    const result = booksReducer(makeCloneData(defaultState), action);

    expect(result.books[0].isFavorite).toBe(false);
    expect(result.books[1].isFavorite).toBe(true);
    expect(result.books[2].isFavorite).toBe(true);
  });

  describe('fetchBook in book Slice', () => {
    it('should change loadingBook with "fetchBook.pending" action', () => {
      const state = booksReducer(
        makeCloneData(defaultState),
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
        makeCloneData(defaultState),
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
        makeCloneData(defaultState),
        fetchBook.rejected(null, 'request-id')
      );

      expect(state.bookLoading).toBe(false);
    });
  });
});

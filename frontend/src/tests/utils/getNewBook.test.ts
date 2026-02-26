import { BookType } from 'types';
import { getNewBook } from 'utils/getNewBook';

global.crypto.randomUUID = () => '123-123-123-123-354';

describe('getNewBook', () => {
  it('should create new book', () => {
    const testBook = { title: 'Book Title', author: 'Book Author' };
    const testSource = 'New Book';

    const expectBook: BookType = {
      ...testBook,
      id: '123-123-123-123-354',
      isFavorite: false,
      source: 'New Book',
    };

    const book = getNewBook(testBook, testSource);

    expect(book).toEqual(expectBook);
  });
});

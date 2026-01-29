import { getNewBook } from 'utils/getNewBook';

global.crypto.randomUUID = () => '123-123-123-123-354';

describe('getNewBook', () => {
  it('should create new book', () => {
    const testBook = { title: 'Book Title', author: 'Book Author' };
    const expectBook = {
      ...testBook,
      id: '123-123-123-123-354',
      isFavorite: false,
    };

    const book = getNewBook(testBook);

    expect(book).toEqual(expectBook);
  });
});

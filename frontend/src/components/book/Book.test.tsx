import { fireEvent, render, screen } from '@testing-library/react';
import { BookType } from 'types';
import { Book } from './Book';
import { makeCloneData, mockBook } from 'tests/helpers';

describe('Book', () => {
  it('should render Book component with props (isFavorite: false)', () => {
    const testBook: BookType = makeCloneData(mockBook);
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    const { container } = render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle=""
        filteredAuthor=""
      />
    );

    const contentElement = container.querySelector('.content');
    const controlsElement = container.querySelector('.controls');
    const numberElement = screen.getByText('1.');
    const titleElement = screen.getByText('Test book Title');
    const authorElement = screen.getByText('Avrin Konor');
    const toggleFavoriteBtnElement = screen.getByTestId('toggleFavoriteBtn');
    const deleteBtnElement = screen.getByTestId('deleteBookBtn');
    const iconOfToggleBtn = toggleFavoriteBtnElement.querySelector('svg');
    const bookSourceElement = screen.getByTestId('bookSource');

    expect(contentElement).toBeInTheDocument();
    expect(controlsElement).toBeInTheDocument();
    expect(numberElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(toggleFavoriteBtnElement).toBeInTheDocument();
    expect(deleteBtnElement).toBeInTheDocument();
    expect(iconOfToggleBtn).toBeInTheDocument();
    expect(iconOfToggleBtn).toHaveStyle({ color: 'rgb(255, 255, 255)' });
    expect(bookSourceElement).toBeInTheDocument();
  });

  it('should render Book component with props (isFavorite: true)', () => {
    const testBook: BookType = makeCloneData({ ...mockBook, isFavorite: true });
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    const { container } = render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle=""
        filteredAuthor=""
      />
    );

    const contentElement = container.querySelector('.content');
    const controlsElement = container.querySelector('.controls');
    const numberElement = screen.getByText('1.');
    const titleElement = screen.getByText('Test book Title');
    const authorElement = screen.getByText('Avrin Konor');
    const toggleFavoriteBtnElement = screen.getByTestId('toggleFavoriteBtn');
    const deleteBtnElement = screen.getByTestId('deleteBookBtn');
    const iconOfToggleBtn = toggleFavoriteBtnElement.querySelector('svg');

    expect(contentElement).toBeInTheDocument();
    expect(controlsElement).toBeInTheDocument();
    expect(numberElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(toggleFavoriteBtnElement).toBeInTheDocument();
    expect(deleteBtnElement).toBeInTheDocument();
    expect(iconOfToggleBtn).toBeInTheDocument();
    expect(iconOfToggleBtn).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });

  it('should render component with filteredTitle prop', () => {
    const testBook: BookType = makeCloneData({
      ...mockBook,
      title: 'Test book tetle',
      isFavorite: true,
    });

    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle="te"
        filteredAuthor=""
      />
    );

    const titleElement = screen.getByTestId('bookTitle');
    const matches = titleElement.querySelectorAll('span');
    const authorElement = screen.getByText('Avrin Konor');
    const toggleFavoriteBtnElement = screen.getByTestId('toggleFavoriteBtn');
    const deleteBtnElement = screen.getByTestId('deleteBookBtn');
    const iconOfToggleBtn = toggleFavoriteBtnElement.querySelector('svg');

    expect(matches.length).toBe(2);
    expect(matches[0]).toHaveTextContent('Te');
    expect(matches[1]).toHaveTextContent('te');
    expect(authorElement).toBeInTheDocument();
    expect(toggleFavoriteBtnElement).toBeInTheDocument();
    expect(deleteBtnElement).toBeInTheDocument();
    expect(iconOfToggleBtn).toBeInTheDocument();
    expect(iconOfToggleBtn).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });

  it('should render component with filteredAuthor prop', () => {
    const testBook: BookType = makeCloneData({
      ...mockBook,
      title: 'Test book tetle',
      isFavorite: true,
    });
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle=""
        filteredAuthor="ri"
      />
    );

    const authorElement = screen.getByTestId('bookAuthor');
    const matches = authorElement.querySelectorAll('span');
    const titleElement = screen.getByText('Test book tetle');
    const toggleFavoriteBtnElement = screen.getByTestId('toggleFavoriteBtn');
    const deleteBtnElement = screen.getByTestId('deleteBookBtn');
    const iconOfToggleBtn = toggleFavoriteBtnElement.querySelector('svg');

    expect(matches.length).toBe(1);
    expect(matches[0]).toHaveTextContent('ri');
    expect(titleElement).toBeInTheDocument();
    expect(toggleFavoriteBtnElement).toBeInTheDocument();
    expect(deleteBtnElement).toBeInTheDocument();
    expect(iconOfToggleBtn).toBeInTheDocument();
    expect(iconOfToggleBtn).toHaveStyle({ color: 'rgb(255, 255, 0)' });
  });

  it('should render component with filteredTitle and filteredAuthor props', () => {
    const testBook: BookType = makeCloneData({
      ...mockBook,
      title: 'Test book title',
      author: 'Avrin Rinat',
      isFavorite: true,
    });
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle="te"
        filteredAuthor="ri"
      />
    );

    const titleElement = screen.getByTestId('bookTitle');
    const tittleMatches = titleElement.querySelectorAll('span');
    const authorElement = screen.getByTestId('bookAuthor');
    const authorMatches = authorElement.querySelectorAll('span');

    expect(tittleMatches.length).toBe(1);
    expect(tittleMatches[0]).toHaveTextContent('Te');
    expect(authorMatches.length).toBe(2);
    expect(authorMatches[0]).toHaveTextContent('ri');
    expect(authorMatches[1]).toHaveTextContent('Ri');
  });

  it('should click remove book button', async () => {
    const testBook: BookType = makeCloneData({ ...mockBook, isFavorite: true });
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle="te"
        filteredAuthor="ri"
      />
    );

    const deleteBookBtn = screen.getByTestId('deleteBookBtn');

    await fireEvent.click(deleteBookBtn);

    expect(deleteBook).toHaveBeenCalledTimes(1);
    expect(toggleFavorite).toHaveBeenCalledTimes(0);
  });

  it('should click toggle favorite button', async () => {
    const testBook: BookType = makeCloneData({ ...mockBook, isFavorite: true });
    const deleteBook = jest.fn();
    const toggleFavorite = jest.fn();

    render(
      <Book
        number={1}
        book={testBook}
        deleteBook={deleteBook}
        toggleFavorite={toggleFavorite}
        filteredTitle="te"
        filteredAuthor="ri"
      />
    );

    const toggleFavoriteBtn = screen.getByTestId('toggleFavoriteBtn');

    await fireEvent.click(toggleFavoriteBtn);

    expect(toggleFavorite).toHaveBeenCalledTimes(1);
    expect(deleteBook).toHaveBeenCalledTimes(0);
  });
});

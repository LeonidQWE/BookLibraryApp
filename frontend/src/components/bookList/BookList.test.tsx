import { render, screen } from '@testing-library/react';
import { makeWrapper } from 'tests/hooks/makeWrapper';
import { BookList } from './BookList';

describe('BookList', () => {
  it('should render component with empty books', () => {
    const wrapper = makeWrapper({
      books: [],
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    render(<BookList />, { wrapper });

    const listElement = screen.getByTestId('list');
    const listTitleElement = screen.getByTestId('listTitle');
    const emptyListElement = screen.getByText('Book list is empty');

    expect(listElement).toBeInTheDocument();
    expect(listTitleElement).toBeInTheDocument();
    expect(listTitleElement).toHaveClass('title');
    expect(emptyListElement).toBeInTheDocument();
    expect(emptyListElement).toHaveClass('empty');
  });

  it('should render component with books', () => {
    const wrapper = makeWrapper({
      books: [
        {
          id: '1234-1234-1234-1234',
          title: 'Book One',
          author: 'Author One',
          isFavorite: false,
        },
        {
          id: '1234-1234-1234-1235',
          title: 'Book Two',
          author: 'Author Two',
          isFavorite: true,
        },
      ],
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { container } = render(<BookList />, { wrapper });

    const books = container.querySelectorAll('.book');

    expect(books.length).toBe(2);
  });
});

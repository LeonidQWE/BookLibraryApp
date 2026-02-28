import { render, screen } from '@testing-library/react';
import { makePreloadedState, makeWrapper } from 'tests/helpers';
import { BookList } from './BookList';

describe('BookList', () => {
  it('should render component with empty books', () => {
    const { Wrapper } = makeWrapper(
      makePreloadedState({
        books: { ...makePreloadedState().books, books: [] },
      })
    );

    render(<BookList />, { wrapper: Wrapper });

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
    const { Wrapper } = makeWrapper(makePreloadedState());

    const { container } = render(<BookList />, { wrapper: Wrapper });

    const books = container.querySelectorAll('.book');

    expect(books.length).toBe(3);
  });
});

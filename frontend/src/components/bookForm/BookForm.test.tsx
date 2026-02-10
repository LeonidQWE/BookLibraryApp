import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeWrapper } from 'tests/hooks/makeWrapper';
import * as hook from 'hooks/useBook';
import { BookForm } from './BookForm';

const wrapper = makeWrapper({
  books: [],
  filters: {
    filteredTitle: '',
    filteredAuthor: '',
    showOnlyFavorites: false,
  },
});

jest.mock('hooks/useBook');

describe('BookForm', () => {
  it('should render component', () => {
    (hook.useBook as jest.Mock).mockReturnValue({
      book: { id: '', author: '', title: '', isFavorite: false },
    });

    render(<BookForm />, { wrapper });

    const formElement = screen.getByTestId('bookForm');
    const titleElement = screen.getByText('Add Book');
    const inputForAuthor = screen.getByPlaceholderText('Add Author');
    const inputForTitle = screen.getByPlaceholderText('Add Title');
    const addBookBtn = screen.getByText('Add new book');
    const addRandomBookBtn = screen.getByText('Add random book');

    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveClass('form');
    expect(titleElement).toBeInTheDocument();
    expect(inputForAuthor).toBeInTheDocument();
    expect(inputForTitle).toBeInTheDocument();
    expect(addBookBtn).toBeInTheDocument();
    expect(addRandomBookBtn).toBeInTheDocument();
  });

  it('should change field fro title', async () => {
    const changeField = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { id: '', author: '', title: '', isFavorite: false },
      changeField,
    });

    render(<BookForm />);

    const titleInputElement = screen.getByPlaceholderText('Add Title');

    await userEvent.type(titleInputElement, 'Test title');

    expect(changeField).toHaveBeenCalledTimes(10);
  });

  it('should change field for author', async () => {
    const changeField = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { id: '', author: '', title: '', isFavorite: false },
      changeField,
    });

    render(<BookForm />);

    const authorInputElement = screen.getByPlaceholderText('Add Author');

    await userEvent.type(authorInputElement, 'Klark Kentuki');

    expect(changeField).toHaveBeenCalledTimes(13);
  });

  it('should submit form', async () => {
    const addNewBook = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { id: '', author: '', title: '', isFavorite: false },
      addNewBook,
    });

    render(<BookForm />);

    const formElement = screen.getByTestId('bookForm');

    await fireEvent.submit(formElement);
    expect(addNewBook).toHaveBeenCalledTimes(1);
  });

  it('should click add random book button', async () => {
    const addRandomBook = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { id: '', author: '', title: '', isFavorite: false },
      addRandomBook,
    });

    render(<BookForm />);

    const addRandomBookBtn = screen.getByText('Add random book');

    await userEvent.click(addRandomBookBtn);

    expect(addRandomBook).toHaveBeenCalledTimes(1);
  });
});

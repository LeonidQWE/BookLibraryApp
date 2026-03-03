import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as hook from 'hooks/useBook';
import { BookForm } from './BookForm';
import { makeWrapper, makePreloadedState } from 'tests/helpers';

jest.mock('hooks/useBook');

describe('BookForm', () => {
  it('should render component', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { author: '', title: '' },
      bookLoading: false,
    });

    render(<BookForm />, { wrapper: Wrapper });

    const formElement = screen.getByTestId('bookForm');
    const titleElement = screen.getByText('Add Book');
    const inputForAuthor = screen.getByPlaceholderText('Add Author');
    const inputForTitle = screen.getByPlaceholderText('Add Title');
    const addBookBtn = screen.getByText('Add new book');
    const addRandomBookBtn = screen.getByText('Add random book');
    const addRandomBookByAPIBtn = screen.getByTestId('addBookByAPI');

    expect(formElement).toBeInTheDocument();
    expect(formElement).toHaveClass('form');
    expect(titleElement).toBeInTheDocument();
    expect(inputForAuthor).toBeInTheDocument();
    expect(inputForTitle).toBeInTheDocument();
    expect(addBookBtn).toBeInTheDocument();
    expect(addRandomBookBtn).toBeInTheDocument();
    expect(addRandomBookByAPIBtn).toBeInTheDocument();
    expect(addRandomBookByAPIBtn).not.toBeDisabled();
    expect(addRandomBookByAPIBtn).toHaveTextContent('Add random book by API');
  });

  it('should render component with false bookLoading', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { author: '', title: '' },
      bookLoading: true,
    });

    render(<BookForm />, { wrapper: Wrapper });

    const loaderComponent = screen.getByTestId('loader');
    const addRandomBookByAPIBtn = screen.getByTestId('addBookByAPI');

    expect(loaderComponent).toBeInTheDocument();
    expect(addRandomBookByAPIBtn).toBeDisabled();
  });

  it('should change field for title', async () => {
    const changeField = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { author: '', title: '' },
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
      book: { author: '', title: '' },
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
      book: { author: '', title: '' },
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
      book: { author: '', title: '' },
      addRandomBook,
    });

    render(<BookForm />);

    const addRandomBookBtn = screen.getByText('Add random book');

    await userEvent.click(addRandomBookBtn);

    expect(addRandomBook).toHaveBeenCalledTimes(1);
  });

  it('should click add random book by API button', async () => {
    const addRandomBookByAPI = jest.fn();

    (hook.useBook as jest.Mock).mockReturnValue({
      book: { author: '', title: '' },
      bookLoading: false,
      addRandomBookByAPI,
    });

    render(<BookForm />);

    const addRandomBookByAPIBtn = screen.getByText('Add random book by API');

    await userEvent.click(addRandomBookByAPIBtn);

    expect(addRandomBookByAPI).toHaveBeenCalledTimes(1);
  });
});

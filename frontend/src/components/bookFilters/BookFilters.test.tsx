import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as hook from 'hooks/useFilters';
import { BookFilters } from './BookFilters';

jest.mock('hooks/useFilters');

describe('BookFilters', () => {
  it('should render component', () => {
    (hook.useFilters as jest.Mock).mockReturnValue({
      filteredTitle: 'Aha',
      filteredAuthor: 'Dfg',
      showOnlyFavorites: false,
    });

    render(<BookFilters />);

    const filtersContsinerElement = screen.getByTestId('filters');
    const filteredTitleInput = screen.getByPlaceholderText('Enter book title');
    const filteredAuthorInput =
      screen.getByPlaceholderText('Enter author name');
    const controlsElement = screen.getByTestId('controls');
    const checkboxElement = screen.getByTestId('checkbox');
    const checkboxInputElement = checkboxElement.querySelector('input');
    const resetFiltersBtn = screen.getByTestId('resetFilters');

    expect(filtersContsinerElement).toBeInTheDocument();
    expect(filtersContsinerElement).toHaveClass('container');
    expect(filteredTitleInput).toBeInTheDocument();
    expect(filteredTitleInput).toHaveAttribute('type', 'text');
    expect(filteredTitleInput).toHaveValue('Aha');
    expect(filteredAuthorInput).toBeInTheDocument();
    expect(filteredAuthorInput).toHaveAttribute('type', 'text');
    expect(filteredAuthorInput).toHaveValue('Dfg');
    expect(controlsElement).toBeInTheDocument();
    expect(controlsElement).toHaveClass('controls');
    expect(checkboxElement).toBeInTheDocument();
    expect(checkboxInputElement).toBeInTheDocument();
    expect(checkboxInputElement).toHaveAttribute('type', 'checkbox');
    expect(resetFiltersBtn).toBeInTheDocument();
  });

  it('should change field filteredTitle', async () => {
    const setFilteredTitle = jest.fn();

    (hook.useFilters as jest.Mock).mockReturnValue({
      setFilteredTitle,
    });

    render(<BookFilters />);

    const filteredTitleInput = screen.getByPlaceholderText('Enter book title');

    await userEvent.type(filteredTitleInput, 'lo');

    expect(setFilteredTitle).toHaveBeenCalledTimes(2);
  });

  it('should change field filteredAuthor', async () => {
    const setFiltereAuthor = jest.fn();

    (hook.useFilters as jest.Mock).mockReturnValue({
      setFiltereAuthor,
    });

    render(<BookFilters />);

    const filteredAuthorInput =
      screen.getByPlaceholderText('Enter author name');

    await userEvent.type(filteredAuthorInput, 'Avalon');

    expect(setFiltereAuthor).toHaveBeenCalledTimes(6);
  });

  it('should click on showOnlyFavorites checkbox', async () => {
    const setShowOnlyFavorites = jest.fn();

    (hook.useFilters as jest.Mock).mockReturnValue({
      setShowOnlyFavorites,
    });

    render(<BookFilters />);

    const checkboxElement = screen.getByTestId('checkbox');
    const checkboxInputElement = checkboxElement.querySelector(
      'input'
    ) as HTMLInputElement;

    await userEvent.click(checkboxInputElement);

    expect(setShowOnlyFavorites).toHaveBeenCalledTimes(1);
  });

  it('should click on resetFilters button', async () => {
    const deleteFilters = jest.fn();

    (hook.useFilters as jest.Mock).mockReturnValue({
      deleteFilters,
    });

    render(<BookFilters />);

    const resetFiltersBtn = screen.getByTestId('resetFilters');

    await userEvent.click(resetFiltersBtn);

    expect(deleteFilters).toHaveBeenCalledTimes(1);
  });
});

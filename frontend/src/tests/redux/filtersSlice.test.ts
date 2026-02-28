import {
  selectFilteredTitle,
  selectFilteredAuthor,
  selectShowOnlyFavorites,
  filtersReducer,
  changeFilterTitle,
  changeFilterAuthor,
  toggleShowOnlyFavorites,
  resetFilters,
} from 'redux/filters/filtersSlice';
import { RootState } from 'redux/store';
import { FiltersTypes } from 'types';

const defaultState = {
  filteredTitle: '',
  filteredAuthor: '',
  showOnlyFavorites: false,
};

describe('filtersSlice', () => {
  describe('filtersSlice selectors', () => {
    const state: Pick<RootState, 'filters'> = {
      filters: {
        filteredTitle: 'Hel',
        filteredAuthor: 'Au',
        showOnlyFavorites: false,
      },
    };

    it('should select selectFilteredTitle from state object', () => {
      const result = selectFilteredTitle(state);
      expect(result).toBe('Hel');
    });

    it('should select selectFilteredAuthor from state object', () => {
      const result = selectFilteredAuthor(state);
      expect(result).toBe('Au');
    });

    it('should select selectShowOnlyFavorites from state object', () => {
      const result = selectShowOnlyFavorites(state);
      expect(result).toBe(false);
    });
  });

  it('should return default state when passed an empty action', () => {
    const result = filtersReducer(undefined, { type: '' });
    expect(result).toEqual(defaultState);
  });

  it('should change filteredTitle with "changeFilterTitle" action', () => {
    const action = { type: changeFilterTitle.type, payload: 'He' };

    const result = filtersReducer(defaultState, action);

    expect(result.filteredTitle).toBe('He');
    expect(result.filteredAuthor).toBe('');
    expect(result.showOnlyFavorites).toBe(false);
  });

  it('should change filteredAuthor with "changeFilterAuthor" action', () => {
    const action = { type: changeFilterAuthor.type, payload: 'Au' };

    const result = filtersReducer(defaultState, action);

    expect(result.filteredTitle).toBe('');
    expect(result.filteredAuthor).toBe('Au');
    expect(result.showOnlyFavorites).toBe(false);
  });

  it('should change showOnlyFavorites with "toggleShowOnlyFavorites" action', () => {
    const action = { type: toggleShowOnlyFavorites.type, payload: true };

    const result = filtersReducer(defaultState, action);

    expect(result.filteredTitle).toBe('');
    expect(result.filteredAuthor).toBe('');
    expect(result.showOnlyFavorites).toBe(true);
  });

  it('should reset filters with "resetFilters" action', () => {
    const filters: FiltersTypes = {
      filteredTitle: 'Hel',
      filteredAuthor: 'Aur',
      showOnlyFavorites: true,
    };

    const action = { type: resetFilters.type };

    const result = filtersReducer(filters, action);

    expect(result.filteredTitle).toBe('');
    expect(result.filteredAuthor).toBe('');
    expect(result.showOnlyFavorites).toBe(false);
  });
});

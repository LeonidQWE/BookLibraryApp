import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useFilters } from 'hooks/useFilters';
import { makePreloadedState, makeWrapper } from 'tests/helpers';

let wrapper: React.FC<{ children: ReactNode }>;

beforeEach(() => {
  const { Wrapper } = makeWrapper(
    makePreloadedState({
      filters: {
        filteredTitle: 'Halo',
        filteredAuthor: 'Aloha',
        showOnlyFavorites: false,
      },
    })
  );

  wrapper = Wrapper;
});

describe('useFilters', () => {
  it('should return an object with correct property', () => {
    const { Wrapper } = makeWrapper();

    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper,
    });

    expect(result.current).toHaveProperty('filteredTitle');
    expect(result.current).toHaveProperty('filteredAuthor');
    expect(result.current).toHaveProperty('showOnlyFavorites');
    expect(result.current).toHaveProperty('setFilteredTitle');
    expect(result.current).toHaveProperty('setFilteredAuthor');
    expect(result.current).toHaveProperty('setShowOnlyFavorites');
    expect(result.current).toHaveProperty('deleteFilters');
  });

  it('should return an object with correct type of property', () => {
    const { Wrapper } = makeWrapper();

    const { result } = renderHook(() => useFilters(), {
      wrapper: Wrapper,
    });

    expect(typeof result.current.filteredTitle).toBe('string');
    expect(typeof result.current.filteredAuthor).toBe('string');
    expect(typeof result.current.showOnlyFavorites).toBe('boolean');
    expect(typeof result.current.setFilteredTitle).toBe('function');
    expect(typeof result.current.setFilteredAuthor).toBe('function');
    expect(typeof result.current.setShowOnlyFavorites).toBe('function');
    expect(typeof result.current.deleteFilters).toBe('function');
  });

  it('should return correct filters value from store', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filteredTitle).toBe('Halo');
    expect(result.current.filteredAuthor).toBe('Aloha');
    expect(result.current.showOnlyFavorites).toBe(false);
  });

  it('should change filteredTitle', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filteredTitle).toBe('Halo');

    act(() => {
      result.current.setFilteredTitle('Avar');
    });

    expect(result.current.filteredTitle).toBe('Avar');
  });

  it('should change filteredAuthor', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filteredAuthor).toBe('Aloha');

    act(() => {
      result.current.setFilteredAuthor('Anar');
    });

    expect(result.current.filteredAuthor).toBe('Anar');
  });

  it('should change showOnlyFavorites', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.showOnlyFavorites).toBe(false);

    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);
  });

  it('should reset filters', () => {
    const { result } = renderHook(() => useFilters(), { wrapper });

    expect(result.current.filteredTitle).toBe('Halo');
    expect(result.current.filteredAuthor).toBe('Aloha');
    expect(result.current.showOnlyFavorites).toBe(false);

    act(() => {
      result.current.deleteFilters();
    });

    expect(result.current.filteredTitle).toBe('');
    expect(result.current.filteredAuthor).toBe('');
    expect(result.current.showOnlyFavorites).toBe(false);
  });
});

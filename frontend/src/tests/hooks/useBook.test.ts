import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useBook } from 'hooks/useBook';
import { makeWrapper, makePreloadedState } from 'tests/helpers';

global.crypto.randomUUID = () => '123-123-123-123-354';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {
    value: { randomUUID: () => '123-123-123-123-354' },
    writable: true,
  });
});

const mockMathRandom = (v: number) =>
  jest.spyOn(Math, 'random').mockReturnValue(v);

const inputEvent = (id: string, value: string) =>
  ({ target: { id, value } }) as React.ChangeEvent<HTMLInputElement>;

const submitEvent = () =>
  ({
    preventDefault: jest.fn(),
  }) as unknown as React.FormEvent<HTMLFormElement>;

describe('useBook', () => {
  describe('correct object from hook', () => {
    it('should return an object with correct property', () => {
      const { Wrapper } = makeWrapper();

      const { result } = renderHook(() => useBook(), {
        wrapper: Wrapper,
      });

      expect(result.current).toHaveProperty('filteredBooks');
      expect(result.current).toHaveProperty('book');
      expect(result.current).toHaveProperty('bookLoading');
      expect(result.current).toHaveProperty('addNewBook');
      expect(result.current).toHaveProperty('changeField');
      expect(result.current).toHaveProperty('removeBook');
      expect(result.current).toHaveProperty('addRandomBook');
      expect(result.current).toHaveProperty('handleToggleFavorite');
      expect(result.current).toHaveProperty('addRandomBookByAPI');
    });

    it('should return an object with correct type property', () => {
      const { Wrapper } = makeWrapper();

      const { result } = renderHook(() => useBook(), {
        wrapper: Wrapper,
      });

      expect(Array.isArray(result.current.filteredBooks)).toBe(true);
      expect(result.current.book).toEqual({
        author: '',
        title: '',
      });
      expect(typeof result.current.bookLoading).toBe('boolean');
      expect(typeof result.current.addNewBook).toBe('function');
      expect(typeof result.current.changeField).toBe('function');
      expect(typeof result.current.removeBook).toBe('function');
      expect(typeof result.current.addRandomBook).toBe('function');
      expect(typeof result.current.handleToggleFavorite).toBe('function');
      expect(typeof result.current.addRandomBookByAPI).toBe('function');
    });
  });

  describe('filteredBooks', () => {
    it('should return filteredBooks without filters', () => {
      const { Wrapper } = makeWrapper(makePreloadedState());

      const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

      expect(result.current.filteredBooks.length).toBe(3);
    });

    it('should return filteredBooks with showOnlyFavorites', () => {
      const { Wrapper } = makeWrapper(
        makePreloadedState({
          filters: { ...makePreloadedState().filters, showOnlyFavorites: true },
        })
      );

      const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

      expect(result.current.filteredBooks).toHaveLength(1);
      expect(result.current.filteredBooks[0].title).toBe('Kinder t');
      expect(result.current.filteredBooks[0].author).toBe('Surf');
    });

    it('should return filteredBooks with title filter', () => {
      const { Wrapper } = makeWrapper(
        makePreloadedState({
          filters: { ...makePreloadedState().filters, filteredTitle: 'T' },
        })
      );

      const { result } = renderHook(() => useBook(), { wrapper: Wrapper });
      expect(result.current.filteredBooks).toHaveLength(2);
      expect(result.current.filteredBooks[0].title).toBe('Title1');
      expect(result.current.filteredBooks[1].title).toBe('Kinder t');
    });

    it('should return filteredBooks with author filter', () => {
      const { Wrapper } = makeWrapper(
        makePreloadedState({
          filters: { ...makePreloadedState().filters, filteredAuthor: 'harry' },
        })
      );

      const { result } = renderHook(() => useBook(), { wrapper: Wrapper });
      expect(result.current.filteredBooks).toHaveLength(1);
      expect(result.current.filteredBooks[0].author).toBe('Harry');
      expect(result.current.filteredBooks[0].title).toBe('Aloha');
    });
  });

  it('should add new book with value', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.changeField(inputEvent('title', 'Clean code'));
      result.current.changeField(inputEvent('author', 'Hones'));
    });

    act(() => {
      result.current.addNewBook(submitEvent());
    });

    expect(result.current.filteredBooks).toHaveLength(4);
    expect(result.current.filteredBooks[3].title).toBe('Clean code');
    expect(result.current.filteredBooks[3].author).toBe('Hones');
    expect(result.current.book).toEqual({
      title: '',
      author: '',
    });
  });

  it('should add new book with empty title value', () => {
    const { Wrapper, store } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.changeField(inputEvent('title', ''));
      result.current.changeField(inputEvent('author', 'Anno'));
    });

    act(() => {
      result.current.addNewBook(submitEvent());
    });

    expect(store.getState().books.books).toHaveLength(3);
    expect(store.getState().error).toBe('Title field is empty');
  });

  it('should add new book with empty author value', () => {
    const { Wrapper, store } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.changeField(inputEvent('title', 'Auth'));
      result.current.changeField(inputEvent('author', ''));
    });

    act(() => {
      result.current.addNewBook(submitEvent());
    });

    expect(store.getState().books.books).toHaveLength(3);
    expect(store.getState().error).toBe('Author field is empty');
  });

  it('should add random new book', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    const spy = mockMathRandom(0);

    act(() => {
      result.current.addRandomBook();
    });

    spy.mockRestore();

    expect(result.current.filteredBooks).toHaveLength(4);
    expect(result.current.filteredBooks[3].title).toBe('Things Fall Apart');
    expect(result.current.filteredBooks[3].author).toBe('Chinua Achebe');
  });

  it('should remove book', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.removeBook('1234-1234=1234-1231');
    });

    expect(result.current.filteredBooks).toHaveLength(2);
    expect(result.current.filteredBooks[0].id).toBe('1234-1234=1234-1232');
    expect(result.current.filteredBooks[1].id).toBe('1234-1234=1234-1233');
  });

  it('should toggle favorite', () => {
    const { Wrapper } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(result.current.filteredBooks[2].isFavorite).toBe(false);

    act(() => {
      result.current.handleToggleFavorite('1234-1234=1234-1233');
    });

    expect(result.current.filteredBooks[2].isFavorite).toBe(true);
  });

  it('should add random book by API', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { title: 'API title', author: 'API author', year: 2020 },
    });

    const { Wrapper, store } = makeWrapper(makePreloadedState());

    const { result } = renderHook(() => useBook(), { wrapper: Wrapper });

    expect(store.getState().books.books).toHaveLength(3);

    await act(async () => {
      await result.current.addRandomBookByAPI();
    });

    expect(store.getState().books.books).toHaveLength(4);
  });
});

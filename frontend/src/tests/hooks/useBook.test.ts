import { renderHook, act } from '@testing-library/react';
import { makeWrapper } from './makeWrapper';
import { useBook } from 'hooks/useBook';
import { BookType } from 'types';

const baseBooks: BookType[] = [
  {
    id: '1234-1234=1234-1231',
    title: 'Title1',
    author: 'Author1',
    isFavorite: false,
  },
  {
    id: '1234-1234=1234-1232',
    title: 'Kinder t',
    author: 'Surft',
    isFavorite: true,
  },
  {
    id: '1234-1234=1234-1233',
    title: 'Aloha',
    author: 'Harry',
    isFavorite: false,
  },
];

global.crypto.randomUUID = () => '123-123-123-123-354';
const mockMathRandom = (v: number) =>
  jest.spyOn(Math, 'random').mockReturnValue(v);

const inputEvent = (id: string, value: string) =>
  ({ target: { id, value } }) as React.ChangeEvent<HTMLInputElement>;

const subminEvent = () =>
  ({
    preventDefault: jest.fn(),
  }) as unknown as React.FormEvent<HTMLFormElement>;

describe('useBook', () => {
  describe('correct object from hook', () => {
    it('should return an object with correct property', () => {
      const { result } = renderHook(() => useBook(), {
        wrapper: makeWrapper(),
      });

      expect(result.current).toHaveProperty('filteredBooks');
      expect(result.current).toHaveProperty('book');
      expect(result.current).toHaveProperty('addNewBook');
      expect(result.current).toHaveProperty('changeField');
      expect(result.current).toHaveProperty('removeBook');
      expect(result.current).toHaveProperty('addRandomBook');
      expect(result.current).toHaveProperty('handleToggleFavorite');
    });

    it('should return an object with correct type property', () => {
      const { result } = renderHook(() => useBook(), {
        wrapper: makeWrapper(),
      });

      expect(Array.isArray(result.current.filteredBooks)).toBe(true);
      expect(result.current.book).toEqual({
        id: '',
        author: '',
        title: '',
        isFavorite: false,
      });
      expect(typeof result.current.addNewBook).toBe('function');
      expect(typeof result.current.changeField).toBe('function');
      expect(typeof result.current.removeBook).toBe('function');
      expect(typeof result.current.addRandomBook).toBe('function');
      expect(typeof result.current.handleToggleFavorite).toBe('function');
    });
  });

  describe('filteredBooks', () => {
    it('should return filteredBooks without filters', () => {
      const wrapper = makeWrapper({
        books: baseBooks,
        filters: {
          filteredTitle: '',
          filteredAuthor: '',
          showOnlyFavorites: false,
        },
      });

      const { result } = renderHook(() => useBook(), { wrapper });

      expect(result.current.filteredBooks.length).toBe(3);
    });

    it('should return filteredBooks with showOnlyFavorites', () => {
      const wrapper = makeWrapper({
        books: baseBooks,
        filters: {
          filteredTitle: '',
          filteredAuthor: '',
          showOnlyFavorites: true,
        },
      });

      const { result } = renderHook(() => useBook(), { wrapper });

      expect(result.current.filteredBooks).toHaveLength(1);
      expect(result.current.filteredBooks[0].title).toBe('Kinder t');
      expect(result.current.filteredBooks[0].author).toBe('Surft');
    });

    it('shoulr return filteredBooks with title filter', () => {
      const wrapper = makeWrapper({
        books: baseBooks,
        filters: {
          filteredTitle: 'T',
          filteredAuthor: '',
          showOnlyFavorites: false,
        },
      });

      const { result } = renderHook(() => useBook(), { wrapper });

      expect(result.current.filteredBooks).toHaveLength(2);
      expect(result.current.filteredBooks[0].title).toBe('Title1');
      expect(result.current.filteredBooks[1].title).toBe('Kinder t');
    });

    it('should return filteredBooks with author filter', () => {
      const wrapper = makeWrapper({
        books: baseBooks,
        filters: {
          filteredTitle: '',
          filteredAuthor: 'harry',
          showOnlyFavorites: false,
        },
      });

      const { result } = renderHook(() => useBook(), { wrapper });

      expect(result.current.filteredBooks).toHaveLength(1);
      expect(result.current.filteredBooks[0].author).toBe('Harry');
      expect(result.current.filteredBooks[0].title).toBe('Aloha');
    });
  });

  it('should add new book with value', () => {
    const wrapper = makeWrapper({
      books: baseBooks,
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { result } = renderHook(() => useBook(), { wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.changeField(inputEvent('title', 'Clean code'));
      result.current.changeField(inputEvent('author', 'Rebeka'));
    });

    act(() => {
      result.current.addNewBook(subminEvent());
    });

    expect(result.current.filteredBooks).toHaveLength(4);
    expect(result.current.filteredBooks[3].title).toBe('Clean code');
    expect(result.current.filteredBooks[3].author).toBe('Rebeka');
    expect(result.current.book).toEqual({
      id: '',
      title: '',
      author: '',
      isFavorite: false,
    });
  });

  it('should add new book without value', () => {
    const wrapper = makeWrapper({
      books: baseBooks,
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { result } = renderHook(() => useBook(), { wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.changeField(inputEvent('title', 'Auth'));
      result.current.changeField(inputEvent('author', ''));
    });

    act(() => {
      result.current.addNewBook(subminEvent());
    });

    expect(result.current.filteredBooks).toHaveLength(3);
  });

  it('should add random new book', () => {
    const wrapper = makeWrapper({
      books: baseBooks,
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { result } = renderHook(() => useBook(), { wrapper });

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
    const wrapper = makeWrapper({
      books: baseBooks,
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { result } = renderHook(() => useBook(), { wrapper });

    expect(result.current.filteredBooks).toHaveLength(3);

    act(() => {
      result.current.removeBook('1234-1234=1234-1231');
    });

    expect(result.current.filteredBooks).toHaveLength(2);
    expect(result.current.filteredBooks[0].id).toBe('1234-1234=1234-1232');
    expect(result.current.filteredBooks[1].id).toBe('1234-1234=1234-1233');
  });

  it('should toggle favorite', () => {
    const wrapper = makeWrapper({
      books: baseBooks,
      filters: {
        filteredTitle: '',
        filteredAuthor: '',
        showOnlyFavorites: false,
      },
    });

    const { result } = renderHook(() => useBook(), { wrapper });

    expect(result.current.filteredBooks[2].isFavorite).toBe(false);

    act(() => {
      result.current.handleToggleFavorite('1234-1234=1234-1233');
    });

    expect(result.current.filteredBooks[2].isFavorite).toBe(true);
  });
});

import { RootState } from 'redux/store';
import { mockBooks } from '../data/mockBooks';
import { makeCloneData } from './makeCloneData';

export const makePreloadedState = (
  overrides?: Partial<RootState>
): RootState => ({
  books: {
    books: makeCloneData(mockBooks),
    bookLoading: false,
  },
  filters: {
    filteredTitle: '',
    filteredAuthor: '',
    showOnlyFavorites: false,
  },
  error: '',
  ...overrides,
});

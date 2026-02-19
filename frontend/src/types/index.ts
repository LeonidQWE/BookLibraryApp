export type SourceType = 'New Book' | 'Random Book' | 'API';

export type BookType = {
  id: string;
  title: string;
  author: string;
  isFavorite: boolean;
  source: SourceType;
};

export type FiltersTypes = {
  filteredTitle: string;
  filteredAuthor: string;
  showOnlyFavorites: boolean;
};

export type BookByAPI = {
  title: string;
  author: string;
  year: number;
};

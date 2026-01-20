export type BookType = {
  id: string;
  title: string;
  author: string;
  isFavorite: boolean;
};

export type FiltersTypes = {
  filteredTitle: string;
  filteredAuthor: string;
  showOnlyFavorites: boolean;
};

import { useFilters } from 'hooks/useFilters';
import { Button, Checkbox, CommonField } from 'components';
import s from './BookFilters.module.css';

export const BookFilters = () => {
  const {
    filteredTitle,
    filteredAuthor,
    showOnlyFavorites,
    setFilteredTitle,
    setFiltereAuthor,
    setShowOnlyFavorites,
    deleteFilters,
  } = useFilters();

  return (
    <div className={s.container} data-testid="filters">
      <CommonField
        placeholder="Enter book title"
        type="text"
        value={filteredTitle}
        setValue={e => setFilteredTitle(e.target.value)}
      />

      <CommonField
        placeholder="Enter author name"
        type="text"
        value={filteredAuthor}
        setValue={e => setFiltereAuthor(e.target.value)}
      />

      <div className={s.controls} data-testid="controls">
        <Checkbox
          labelText="Only Favorites"
          value={showOnlyFavorites}
          onChange={e => setShowOnlyFavorites(e.target.checked)}
        />

        <Button
          btnText="Reset Filters"
          variant="primary"
          onClick={deleteFilters}
          dataTestid="resetFilters"
        />
      </div>
    </div>
  );
};

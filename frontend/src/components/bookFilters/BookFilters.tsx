import { useFilters } from 'hooks/useFilters';
import { Button, Checkbox, CommonField } from 'components';
import s from './BookFilters.module.css';

export const BookFilters = () => {
  const {
    filteredTitle,
    filteredAuthor,
    showOnlyFavorites,
    changeFilteredTitle,
    changeFilteredAuthor,
    handleToggleShowOnlyFavorites,
    deleteFilters,
  } = useFilters();

  return (
    <div className={s.container}>
      <CommonField
        placeholder="Enter book title"
        type="text"
        value={filteredTitle}
        setValue={changeFilteredTitle}
      />

      <CommonField
        placeholder="Enter author name"
        type="text"
        value={filteredAuthor}
        setValue={changeFilteredAuthor}
      />

      <div className={s.controls}>
        <Checkbox
          labelText="Only Favorites"
          value={showOnlyFavorites}
          onChange={handleToggleShowOnlyFavorites}
        />

        <Button
          btnText="Reset Filters"
          variant="primary"
          onClick={deleteFilters}
        />
      </div>
    </div>
  );
};

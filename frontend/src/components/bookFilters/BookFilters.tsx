import { useFilters } from 'hooks/useFilters';
import { Button, CommonField } from 'components';
import s from './BookFilters.module.css';

export const BookFilters = () => {
  const { filteredTitle, changeFilterField, deleteFilters } = useFilters();

  return (
    <div className={s.container}>
      <CommonField
        placeholder="Enter book title"
        type="text"
        value={filteredTitle}
        setValue={changeFilterField}
      />

      <Button
        btnText="Reset Filters"
        variant="primary"
        onClick={deleteFilters}
      />
    </div>
  );
};

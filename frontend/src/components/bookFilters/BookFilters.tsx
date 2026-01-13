import { useFilters } from 'hooks/useFilters';
import { CommonField } from 'components';
import s from './BookFilters.module.css';

export const BookFilters = () => {
  const { filteredTitle, changeFilterField } = useFilters();

  return (
    <div className={s.container}>
      <CommonField
        placeholder="Enter book title"
        type="text"
        value={filteredTitle}
        setValue={changeFilterField}
      />
    </div>
  );
};

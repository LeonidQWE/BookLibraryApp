import { useBook } from 'hooks/useBook';
import { Button, CommonField, Title } from 'components';

import s from './BookForm.module.css';

export const BookForm = () => {
  const { book, addNewBook, changeField } = useBook();

  

  return (
    <form className={s.form} onSubmit={addNewBook}>
      <Title title="Add Book" level={3} />
      <CommonField
        id="author"
        labelText="Author"
        placeholder="Add Author"
        value={book.author}
        setValue={changeField}
      />
      <CommonField
        id="title"
        labelText="Title"
        placeholder="Add Title"
        value={book.title}
        setValue={changeField}
      />
      <Button btnText="Add new book" type="submit" />
    </form>
  );
};

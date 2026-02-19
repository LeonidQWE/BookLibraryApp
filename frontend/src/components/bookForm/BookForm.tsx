import { useBook } from 'hooks/useBook';
import { Button, CommonField, Title } from 'components';
import s from './BookForm.module.css';

export const BookForm = () => {
  const { book, addNewBook, changeField, addRandomBook, addRandomBookByAPI } =
    useBook();

  return (
    <form data-testid="bookForm" className={s.form} onSubmit={addNewBook}>
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
      <Button btnText="Add random book" type="button" onClick={addRandomBook} />
      <Button
        btnText="Add random book by API"
        type="button"
        onClick={addRandomBookByAPI}
      />
    </form>
  );
};

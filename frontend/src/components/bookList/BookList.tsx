import { useBook } from 'hooks/useBook';
import { Book } from 'components';
import s from './BookList.module.css';

export const BookList = () => {
  const { books, removeBook } = useBook();

  return (
    <div className={s.bookList}>
      {books.map((book, index) => (
        <Book
          key={book.id}
          number={++index}
          book={book}
          deleteBook={removeBook}
        />
      ))}
    </div>
  );
};

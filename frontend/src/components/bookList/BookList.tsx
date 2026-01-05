import { useBook } from 'hooks/useBook';
import { Book } from 'components';
import s from './BookList.module.css';

export const BookList = () => {
  const { books } = useBook();

  return (
    <div className={s.bookList}>
      <p className={s.title}>All books</p>
      {books.length <= 0 ?
        <p className={s.empty}>Book list is empty</p>
      : <>
          {books.map((book, index) => (
            <Book key={book.id} number={++index} book={book} />
          ))}
        </>
      }
    </div>
  );
};

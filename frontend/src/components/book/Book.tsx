import { Button } from 'components/button/Button';
import { BookType } from 'types';
import s from './Book.module.css';

type BookProps = {
  number: number;
  book: BookType;
  deleteBook: (id: string) => void;
};

export const Book = ({ number, book, deleteBook }: BookProps) => {
  return (
    <div className={s.book}>
      <div className={s.content}>
        <span>{number}.</span>
        <p>{book.title}</p>
        <p className={s.author}>{book.author}</p>
      </div>

      <Button
        btnText="X"
        size="sm"
        variant="primary"
        onClick={() => deleteBook(book.id)}
      />
    </div>
  );
};

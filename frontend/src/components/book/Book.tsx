import { BookType } from 'types';
import s from './Book.module.css';

type BookProps = {
  number: number;
  book: BookType;
};

export const Book = ({ number, book }: BookProps) => {
  return (
    <div className={s.book}>
      <div className={s.content}>
        <span>{number}.</span>
        <p>{book.title}</p>
        <p className={s.author}>{book.author}</p>
      </div>
    </div>
  );
};

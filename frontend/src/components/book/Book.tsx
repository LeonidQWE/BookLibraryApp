import { AiOutlineDelete } from 'react-icons/ai';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { Button } from 'components/button/Button';
import { BookType } from 'types';
import s from './Book.module.css';
import { useBook } from 'hooks/useBook';

type BookProps = {
  number: number;
  book: BookType;
};

export const Book = ({ number, book }: BookProps) => {
  const { removeBook, handleToggleFavorite } = useBook();

  return (
    <div className={s.book}>
      <div className={s.content}>
        <span>{number}.</span>
        <p>{book.title}</p>
        <p className={s.author}>{book.author}</p>
      </div>

      <div className={s.controls}>
        <Button
          btnText={
            <BsBookmarkStarFill
              style={{ color: book.isFavorite ? 'yellow' : '' }}
            />
          }
          size="sm"
          variant="primary"
          onClick={() => handleToggleFavorite(book.id)}
        />

        <Button
          btnText={<AiOutlineDelete />}
          size="sm"
          variant="primary"
          onClick={() => removeBook(book.id)}
        />
      </div>
    </div>
  );
};

import { AiOutlineDelete } from 'react-icons/ai';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { Button } from 'components/button/Button';
import { useBook } from 'hooks/useBook';
import { useFilters } from 'hooks/useFilters';
import { highlightMatch } from 'utils/highlightMatch';
import { BookType } from 'types';
import s from './Book.module.css';

type BookProps = {
  number: number;
  book: BookType;
};

export const Book = ({ number, book }: BookProps) => {
  const { removeBook, handleToggleFavorite } = useBook();
  const { filteredTitle, filteredAuthor } = useFilters();

  return (
    <div className={s.book}>
      <div className={s.content}>
        <span>{number}.</span>
        <p>{highlightMatch(book.title, filteredTitle)}</p>
        <strong>{highlightMatch(book.author, filteredAuthor)}</strong>
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

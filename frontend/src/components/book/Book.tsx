import { AiOutlineDelete } from 'react-icons/ai';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { Button } from 'components/button/Button';
import { highlightMatch } from 'utils/highlightMatch';
import { BookType } from 'types';
import s from './Book.module.css';

type BookProps = {
  number: number;
  book: BookType;
  deleteBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
  filteredTitle: string;
  filteredAuthor: string;
};

export const Book = ({
  number,
  book,
  deleteBook,
  toggleFavorite,
  filteredTitle,
  filteredAuthor,
}: BookProps) => {
  return (
    <div className={s.book}>
      <div className={s.content}>
        <span>{number}.</span>
        <p data-testid="bookTitle">
          {highlightMatch(book.title, filteredTitle)}
        </p>
        <strong data-testid="bookAuthor">
          {highlightMatch(book.author, filteredAuthor)}
        </strong>
        <p>({book.source})</p>
      </div>

      <div className={s.controls}>
        <Button
          btnText={
            <BsBookmarkStarFill
              style={{
                color:
                  book.isFavorite ? 'rgb(255, 255, 0)' : 'rgb(255, 255, 255)',
              }}
            />
          }
          size="sm"
          variant="primary"
          onClick={() => toggleFavorite(book.id)}
          dataTestid="toggleFavoriteBtn"
        />

        <Button
          btnText={<AiOutlineDelete />}
          size="sm"
          variant="primary"
          onClick={() => deleteBook(book.id)}
          dataTestid="deleteBookBtn"
        />
      </div>
    </div>
  );
};

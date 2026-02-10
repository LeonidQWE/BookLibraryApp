import { useBook } from 'hooks/useBook';
import { useFilters } from 'hooks/useFilters';
import { Book } from 'components';
import s from './BookList.module.css';

export const BookList = () => {
  const { filteredBooks, removeBook, handleToggleFavorite } = useBook();
  const { filteredTitle, filteredAuthor } = useFilters();

  return (
    <div className={s.bookList} data-testid="list">
      <p className={s.title} data-testid="listTitle">
        All books
      </p>
      {filteredBooks.length <= 0 ?
        <p className={s.empty}>Book list is empty</p>
      : <>
          {filteredBooks.map((book, index) => (
            <Book
              key={book.id}
              number={++index}
              book={book}
              deleteBook={removeBook}
              toggleFavorite={handleToggleFavorite}
              filteredTitle={filteredTitle}
              filteredAuthor={filteredAuthor}
            />
          ))}
        </>
      }
    </div>
  );
};

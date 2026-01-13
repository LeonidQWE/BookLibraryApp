import { BookFilters, BookForm, BookList, Container } from 'components';
import s from './Main.module.css';

export const Main = () => {
  return (
    <main>
      <Container>
        <div className={s.content}>
          <BookForm />

          <div className={s.description}>
            <BookFilters />
            <BookList />
          </div>
        </div>
      </Container>
    </main>
  );
};

import { BookForm, BookList, Container } from 'components';
import s from './Main.module.css';

export const Main = () => {
  return (
    <main>
      <Container>
        <div className={s.content}>
          <BookForm />

          <div className={s.description}>
            {/* BookFilter */}
            <BookList />
          </div>
        </div>
      </Container>
    </main>
  );
};

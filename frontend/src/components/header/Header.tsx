import { Container, Title } from 'components';
import s from './Header.module.css';

export const Header = () => {
  return (
    <header className={s.header} data-testid="header">
      <Container>
        <Title title="Book Library" level={1} color="light" />
      </Container>
    </header>
  );
};

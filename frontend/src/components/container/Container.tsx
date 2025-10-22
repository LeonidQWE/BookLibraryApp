import { ReactNode } from 'react';

import s from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div data-testid="container" className={s.container}>
      {children}
    </div>
  );
};

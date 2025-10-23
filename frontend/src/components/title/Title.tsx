import { JSX } from 'react';
import s from './Title.module.css';

export type LevelType = 1 | 2 | 3 | 4 | 5 | 6;

type TitleProps = {
  title: string;
  color?: 'light' | 'dark';
  level?: LevelType;
};

export const Title = ({ title, color = 'dark', level = 2 }: TitleProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag data-testid="title" className={`${s.title} ${s[color]}`}>
      {title}
    </Tag>
  );
};

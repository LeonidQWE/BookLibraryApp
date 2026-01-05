import { ReactNode } from 'react';
import s from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  btnText?: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: ButtonType;
  size?: ButtonSize;
};

export const Button = ({
  btnText = 'Click',
  variant = 'primary',
  onClick,
  type = 'button',
  size = 'md',
}: ButtonProps) => {
  return (
    <button
      data-testid="button"
      className={`${s.button} ${s[variant]} ${s[size]}`}
      onClick={onClick}
      type={type}>
      {btnText}
    </button>
  );
};

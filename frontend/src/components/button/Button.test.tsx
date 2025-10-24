import { render, screen } from '@testing-library/react';
import { Button, ButtonSize, ButtonType, ButtonVariant } from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('should render component without props', () => {
    render(<Button />);

    const buttonElement = screen.getByTestId('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass('primary');
    expect(buttonElement).toHaveClass('md');
    expect(buttonElement).toHaveTextContent('Click');
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('should render component with text', () => {
    render(<Button btnText="Create Item" />);

    const buttonElement = screen.getByTestId('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Create Item');
  });

  it.each<{ variant: ButtonVariant; expected: string }>([
    { variant: 'primary', expected: 'primary' },
    { variant: 'secondary', expected: 'secondary' },
  ])(
    'should render component with variant $variant',
    ({ variant, expected }) => {
      render(<Button variant={variant} />);

      const buttonElement = screen.getByTestId('button');

      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('button');
      expect(buttonElement).toHaveClass(expected);
    }
  );

  it.each<{ size: ButtonSize; expected: string }>([
    { size: 'sm', expected: 'sm' },
    { size: 'md', expected: 'md' },
    { size: 'lg', expected: 'lg' },
  ])('should render component with size $size', ({ size, expected }) => {
    render(<Button size={size} />);

    const buttonElement = screen.getByTestId('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('button');
    expect(buttonElement).toHaveClass(expected);
  });

  it.each<{ type: ButtonType; expected: string }>([
    { type: 'submit', expected: 'submit' },
    { type: 'reset', expected: 'reset' },
    { type: 'button', expected: 'button' },
  ])('sould render component with type $type', ({ type, expected }) => {
    render(<Button type={type} />);

    const buttonElement = screen.getByTestId('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', expected);
  });

  it('should render component with hendler', async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick} />);

    const buttonElement = screen.getByTestId('button');

    await userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

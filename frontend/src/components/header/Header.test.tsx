import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('should render component with props', () => {
    render(<Header />);

    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });
});

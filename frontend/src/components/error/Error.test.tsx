import { render, screen } from '@testing-library/react';
import { Error } from './Error';

jest.mock('react-toastify', () => ({
  ToastContainer: () => (
    <div
      data-testid="error"
      data-position="top-right"
      data-autoclose={2000}></div>
  ),
}));

jest.mock('hooks/useError', () => ({
  useError: jest.fn(),
}));

describe('Error', () => {
  it('should render component', () => {
    render(<Error />);

    const errorElement = screen.getByTestId('error');

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute('data-position', 'top-right');
    expect(errorElement).toHaveAttribute('data-autoClose', '2000');
  });
});

import { render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import userEvent from '@testing-library/user-event';

describe('Checkbox', () => {
  it('should render component with props', () => {
    const onChange = jest.fn();

    const { container } = render(
      <div>
        <Checkbox labelText="Test checkbox" value={false} onChange={onChange} />
      </div>
    );

    const element = screen.getByTestId('checkbox');
    const inputElement = container.querySelector('input');

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('checkbox');
    expect(element).toHaveTextContent('Test checkbox');
    expect(inputElement).toHaveClass('input');
    expect(inputElement).toHaveAttribute('type', 'checkbox');
  });

  it('should change value in input', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <Checkbox labelText="Test checkbox" value={false} onChange={onChange} />
    );

    const inputElement = container.querySelector('input') as HTMLInputElement;

    expect(inputElement).not.toBeChecked();

    await userEvent.setup().click(inputElement);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

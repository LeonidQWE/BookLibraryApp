import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommonField } from './CommonField';

describe('CommonField', () => {
  it('should render component with props', async () => {
    const onChange = jest.fn();

    render(
      <CommonField
        id="testId"
        value="testValue"
        setValue={onChange}
        placeholder="Test Placeholder"
        type="password"
        labelText="Test label text"
      />
    );

    const commonFieldElement = screen.getByTestId('field');
    const inputElement = screen.getByTestId('input');
    const labelElement = screen.getByTestId('label');

    expect(commonFieldElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();

    expect(commonFieldElement).toHaveClass('field');
    expect(labelElement).toHaveClass('fieldLabel');
    expect(inputElement).toHaveClass('fieldInput');

    expect(labelElement).toHaveTextContent('Test label text');

    expect(labelElement).toHaveAttribute('for', 'testId');

    expect(inputElement).toHaveAttribute('type', 'password');
    expect(inputElement).toHaveAttribute('id', 'testId');
    expect(inputElement).toHaveAttribute('placeholder', 'Test Placeholder');
    expect(inputElement).toHaveAttribute('value', 'testValue');

    await userEvent.type(inputElement, 'testValue');
    expect(onChange).toHaveBeenCalledTimes(9);
  });

  it('should render component with props', () => {
    render(<CommonField />);

    const commonFieldElement = screen.getByTestId('field');
    const inputElement = screen.getByTestId('input');

    expect(commonFieldElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(commonFieldElement).toHaveClass('field');
    expect(inputElement).toHaveClass('fieldInput');
    expect(inputElement).toHaveAttribute('type', 'text');
    expect(inputElement).toHaveAttribute('placeholder', '');
  });
});

import { render, screen } from '@testing-library/react';
import { highlightMatch } from 'utils/highlightMatch';

describe('highlightMatch', () => {
  it('should show match in the middle string', () => {
    const testString = 'Hello World';
    const testFilter = 'lo';

    const result = highlightMatch(testString, testFilter);
    const { container } = render(<div>{result}</div>);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
    expect(container.querySelectorAll('span').length).toBe(1);
    expect(screen.getByText('lo')).toBeInTheDocument();
    expect(container.textContent).toBe('Hello World');
  });

  it('should show some matches in the string', () => {
    const testString = 'Hello World';
    const testFilter = 'l';

    const result = highlightMatch(testString, testFilter);
    const { container } = render(<div>{result}</div>);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(7);
    expect(container.querySelectorAll('span').length).toBe(3);
    expect(container.textContent).toBe('Hello World');
  });

  it('should show match in start of string', () => {
    const result = highlightMatch('aloha', 'al');

    const { container } = render(<div>{result}</div>);

    expect(container.querySelectorAll('span').length).toBe(1);
  });

  it('should show matches in end of string', () => {
    const result = highlightMatch('aloha', 'ha');

    const { container } = render(<div>{result}</div>);

    expect(container.querySelectorAll('span').length).toBe(1);
  });

  it('should show case-insensitive matches', () => {
    const result = highlightMatch('Hello', 'he');

    const { container } = render(<div>{result}</div>);

    expect(screen.getByText('He')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveStyle({
      backgroundColor: '#ff0',
    });
  });

  it('should return value with empty filter', () => {
    const result = highlightMatch('aloha', '');

    const expectResult = 'aloha';

    expect(result).toBe(expectResult);
  });
});

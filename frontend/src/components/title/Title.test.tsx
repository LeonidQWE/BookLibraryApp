import { render, screen } from '@testing-library/react';

import { LevelType, Title } from './Title';

describe('Title', () => {
  it.each<{ level?: LevelType | undefined; title: string; expected: string }>([
    { level: 1, title: 'test', expected: 'H1' },
    { level: 2, title: 'test', expected: 'H2' },
    { level: 3, title: 'test', expected: 'H3' },
    { level: 4, title: 'test', expected: 'H4' },
    { level: 5, title: 'test', expected: 'H5' },
    { level: 6, title: 'test', expected: 'H6' },
    { title: 'test', expected: 'H2' },
  ])(
    'should render Title component with differenetn level $level',
    ({ level, title, expected }) => {
      render(<Title title={title} level={level} />);

      const titleElement = screen.getByTestId('title');

      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveClass('title');
      expect(titleElement).toHaveClass('dark');
      expect(titleElement.tagName).toBe(expected);
    }
  );

  it('should render component with props', () => {
    render(<Title title="test" color="light" level={4} />);

    const titleElement = screen.getByTestId('title');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('title');
    expect(titleElement).toHaveClass('light');
    expect(titleElement.tagName).toBe('H4');
  });
});

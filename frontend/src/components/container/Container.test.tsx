import { render, screen } from '@testing-library/react';

import { Container } from './Container';

describe('Container', () => {
  it('should render successfully', () => {
    render(
      <Container>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
          fugiat deserunt quasi?
        </p>
      </Container>
    );

    const containerElement = screen.getByTestId('container');

    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveClass('container');
  });
});

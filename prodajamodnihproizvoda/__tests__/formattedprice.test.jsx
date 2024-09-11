import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import FormattedPrice from '../src/components/FormattedPrice';

describe('FormattedPrice', () => {
  it('renders formatted price correctly', () => {
    // Arrange
    const amount = 1234.56;

    // Act
    render(<FormattedPrice amount={amount} />);

    // Assert
    const formattedPrice = screen.getByText('$1,234.56'); // USD currency format for the amount 1234.56
    expect(formattedPrice).toBeInTheDocument();
  });

  it('renders correctly with zero amount', () => {
    // Arrange
    const amount = 0;

    // Act
    render(<FormattedPrice amount={amount} />);

    // Assert
    const formattedPrice = screen.getByText('$0.00');
    expect(formattedPrice).toBeInTheDocument();
  });

  it('renders correctly with a small amount', () => {
    // Arrange
    const amount = 0.99;

    // Act
    render(<FormattedPrice amount={amount} />);

    // Assert
    const formattedPrice = screen.getByText('$0.99');
    expect(formattedPrice).toBeInTheDocument();
  });

  it('renders correctly with a large amount', () => {
    // Arrange
    const amount = 123456789.99;

    // Act
    render(<FormattedPrice amount={amount} />);

    // Assert
    const formattedPrice = screen.getByText('$123,456,789.99');
    expect(formattedPrice).toBeInTheDocument();
  });
});
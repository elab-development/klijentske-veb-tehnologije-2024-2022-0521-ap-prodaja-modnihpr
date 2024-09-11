// Import necessary libraries and components
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Container from '../src/components/Container'

// Describe the test suite for the Container component
describe('Container', () => {
  it('renders children correctly', () => {
    // Render the Container component with some children
    render(<Container><span>Test Child</span></Container>)

    // Check that the child element is rendered
    const childElement = screen.getByText('Test Child')
    expect(childElement).toBeInTheDocument()
  })

  it('applies the className prop correctly', () => {
    // Render the Container component with a className prop
    render(<Container className="custom-class"><span>Another Child</span></Container>)

    // Check that the div element has the custom class
    const containerElement = screen.getByText('Another Child').parentElement
    expect(containerElement).toHaveClass('custom-class')
  })

  it('applies default classes correctly', () => {
    // Render the Container component without any className prop
    render(<Container><span>Default Class Child</span></Container>)

    // Check that the div element has the default classes
    const containerElement = screen.getByText('Default Class Child').parentElement
    expect(containerElement).toHaveClass('max-w-screen-xl')
    expect(containerElement).toHaveClass('mx-auto')
    expect(containerElement).toHaveClass('px-4')
    expect(containerElement).toHaveClass('xl:px-0')
    expect(containerElement).toHaveClass('py-10')
  })
})

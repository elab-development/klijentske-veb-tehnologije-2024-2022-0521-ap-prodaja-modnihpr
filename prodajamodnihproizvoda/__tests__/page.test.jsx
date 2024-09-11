import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/components/Page'

// Ensure the Page component is correctly typed if necessary
describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    // Get the heading element by its role and level
    const heading = screen.getByRole('heading', { level: 1 })

    // Check that the heading is in the document
    expect(heading).toBeInTheDocument()
  })
})
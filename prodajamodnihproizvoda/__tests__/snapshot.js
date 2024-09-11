import { render } from '@testing-library/react'
import Page from '../src/components/Page'
 
it('renders homepage unchanged', () => {
  const { container } = render(<Page />)
  expect(container).toMatchSnapshot()
})
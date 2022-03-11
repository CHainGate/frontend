import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import HomeTest from "../pages/hometest";
import {renderWithStore} from "../lib/render-with-store";

describe('Home', () => {
  it('renders a heading', async() => {
    renderWithStore(<Home />, {})
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
  })
})


describe('Home', () => {
  it('renders a heading', () => {
    render(<HomeTest />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

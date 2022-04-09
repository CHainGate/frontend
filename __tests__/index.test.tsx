import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import {renderWithStore} from "../lib/render-with-store";
import Login from "../pages/login";
import Sidebar from "../src/Sidebar";

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'; // whatever
  },
}));

describe('Home', () => {
  it('render login', async() => {
    renderWithStore(<Login />, {})
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
  })
})


describe('Sidebar', () => {
  it('render Sidebar', async() => {
    renderWithStore(<Sidebar />, {})
    expect(await screen.getAllByText(/Dashboard/i).at(0)).toBeInTheDocument();
  })
})



/*describe('Home', () => {
  it('renders a heading', () => {
    render(<HomeTest />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})*/

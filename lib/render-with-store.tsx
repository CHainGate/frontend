import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { makeStore } from '../lib/store'

export const renderWithStore = (component: any, initialState: any) => {
    const Wrapper = ({ children } : any) => (
        <Provider store={makeStore(initialState)}>{children}</Provider>
    )
    return render(component, { wrapper: Wrapper })
}
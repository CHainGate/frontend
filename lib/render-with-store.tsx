import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { makeStore } from './store'
import {ThemeProvider} from "@mui/system";
import theme from "../src/theme";

export const renderWithStore = (component: any, initialState: any) => {
    const Wrapper = ({ children } : any) => (
        <Provider store={makeStore(initialState)}><ThemeProvider theme={theme}>{children}</ThemeProvider></Provider>
    )
    return render(component, { wrapper: Wrapper })
}
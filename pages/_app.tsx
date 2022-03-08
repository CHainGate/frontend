import '../styles/globals.css'
import type { AppProps } from 'next/app'

const { wrapper } = require("../lib/store");

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(App);
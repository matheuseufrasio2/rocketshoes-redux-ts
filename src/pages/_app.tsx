import type { AppProps } from 'next/app'
import { Header } from '../components/Header';
import { GlobalStyle, Container } from '../styles/globals';
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Container>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}
export default MyApp

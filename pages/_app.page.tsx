import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

// import Navigation from '../design-system/Navigation';

import '../public/css/style.css';

import { useStore, initialState } from '../redux/';

function App({ Component, pageProps }: AppProps) {
  const store = useStore(initialState);

  return (
    <Provider store={store}>
      {/* <Navigation /> */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default App

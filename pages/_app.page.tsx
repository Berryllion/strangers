import { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import "../public/css/style.css";

import { useStore, initialState, ReduxState } from "../redux/";

const ThemeWrapper = ({ children }) => {
  const { currentTheme } = useSelector((state: ReduxState) => state.theme);

  return (
    <ThemeProvider theme={currentTheme}>
      {children}
    </ThemeProvider>
  )
}

function App({ Component, pageProps }: AppProps) {
  const store = useStore(initialState);

  return (
    <Provider store={store}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </Provider>
  );
}

export default App

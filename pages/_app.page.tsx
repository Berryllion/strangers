import { AppProps } from "next/app";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { Children, useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import "../public/css/style.css";

import { useStore, initialState, ReduxState } from "../redux/";
import { SET_CARDS_AVAILABLE, SET_CURRENT_CARD, SET_CURRENT_PLAYER, SET_GAME_LEVEL } from "../redux/actions/game";
import { SET_PLAYERS } from "../redux/actions/players";
import { SET_SELECTED_DECKS } from "../redux/actions/selectedDecks";
import { clearStorage, getStorage } from "../redux/storage";

const InfosLoader = ({ children }) => {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const {
        players,
        decks,
        cards,
        level,
        currentCard,
        currentPlayer,
      } = getStorage();
      clearStorage();

      if (players) {
        // ff players are in storage, add them to store
        // otherwise go back to index page because there are players
        dispatch({ type: SET_PLAYERS, payload: JSON.parse(players) });
        if (decks) {
          // if decks chosen, add them to store
          // otherwise go back to decks page
          dispatch({ type: SET_SELECTED_DECKS, payload: JSON.parse(decks) });
          if (cards) {
            // if cards have been shuffled, add them to store
            // otherwise go back to decks page to shuffle them again
            dispatch({ type: SET_CARDS_AVAILABLE, payload: JSON.parse(cards) });

            // load other info of the game
            // if they are not defined, they will get the default values
            if (level)
              dispatch({ type: SET_GAME_LEVEL, payload: JSON.parse(level) });
            if (currentCard)
              dispatch({ type: SET_CURRENT_CARD, payload: Number(currentCard) });
            if (currentPlayer)
              dispatch({ type: SET_CURRENT_PLAYER, payload: Number(currentPlayer) });

          } else {
            router.replace('/decks');
          }
        } else {
          router.replace('/decks');
        }
      } else {
        router.replace('/');
      }
      setLoaded(true);
    }
  }, []);

  if (!loaded)
    return null;
  return children;
}

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
    <>
      <Head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='robots' content='noindex' />
      </Head>
      <Provider store={store}>
        <ThemeWrapper>
          <InfosLoader>
            <Component {...pageProps} />
          </InfosLoader>
        </ThemeWrapper>
      </Provider>
    </>
  );
}

export default App

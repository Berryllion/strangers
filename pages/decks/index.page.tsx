import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import Main from "../../designSystem/Main";
import Error from "../../designSystem/Error";
import { Button, ChoiceButton } from "../../designSystem/input/Button";
import { ReduxState } from "../../redux";
import { SET_SELECTED_DECKS } from "../../redux/actions/selectedDecks";
import {
  SET_CARDS_AVAILABLE,
  SET_CURRENT_CARD,
  SET_CURRENT_PLAYER,
  SET_GAME_LEVEL
} from "../../redux/actions/game";

const StyledMain = styled(Main)`
  position: relative;
  padding-top: 5%;
  padding-bottom: 5%;
  overflow: auto;
  height: auto;
  display: flex;

  > h2 {
    margin-bottom: 3rem;
  }
`;

const StyledChoiceButton = styled(ChoiceButton)`
  width: 100%;

  > p {
    margin: 1rem 0 0 0;
    text-transform: initial;
    font-weight: normal;
  }
`;

const ContinueButton = styled(Button)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-self: flex-end;
`;

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const players = useSelector((state: ReduxState) => state.players);
  const decks = useSelector((state: ReduxState) => state.decks);

  const [selectedDecks, setSelectedDecks] = useState([]);

  const selectedDecksNb = selectedDecks.length;
  const playersNb = players.length;

  const onClickDeck = deckMenuName => {
    if (selectedDecks.find(d => d === deckMenuName) === undefined) {
      setSelectedDecks([...selectedDecks, deckMenuName]);
    } else {
      const indexToRemove = selectedDecks.findIndex(d => d === deckMenuName);
      const selectedDecksTmp = [...selectedDecks];
      selectedDecksTmp.splice(indexToRemove, 1);

      setSelectedDecks(selectedDecksTmp);
    }
  }

  const goToNextPage = () => {
    if (selectedDecksNb === 0) return;

    dispatch({
      type: SET_SELECTED_DECKS,
      payload: selectedDecks,
    });
    dispatch({
      type: SET_CARDS_AVAILABLE,
      payload: {
        level1: [],
        level2: [],
        level3: [],
        finalCard: [],
      }
    });
    dispatch({
      type: SET_GAME_LEVEL,
      payload: 0,
    });
    dispatch({
      type: SET_CURRENT_CARD,
      payload: 0,
    });
    dispatch({
      type: SET_CURRENT_PLAYER,
      payload: 0,
    });
    router.push("/play");
  }

  const DeckButton = ({ deck }) => {
    return (
      <StyledChoiceButton
        onClick={() => onClickDeck(deck.menu)}
        selected={selectedDecks.find(d => d === deck.menu) !== undefined}
      >
        {deck.menu}<br />
        {deck["back-description"].map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </StyledChoiceButton>
    )
  }

  if (playersNb === 0) {
    return (
      <Main>
        <Error>
          Error: No players.
        </Error>
      </Main>
    )
  }

  return (
    <>
      <Head>
        <title>{"Decks"}</title>
      </Head>
      <StyledMain>
        <h2>Choose your deck(s)</h2>
        {playersNb > 1 && (
          decks.all.map(deck => (
            <DeckButton deck={deck} key={deck.name} />
          ))
        )}
        {playersNb === 1 && (
          <>
            <Error>Error: 1 player decks not available yet.</Error>
            {/* {decks.all.filter(deck => !deck["is-expension"]).map(deck => (
              <DeckButton deck={deck} key={deck.name} />
            ))} */}
          </>
        )}
        <ContinueButton
          noPadding
          disabled={selectedDecksNb === 0}
          onClick={goToNextPage}
        >
          {selectedDecksNb === 0 ? "No decks" : "Continue ►"}
        </ContinueButton>
      </StyledMain>
    </>
  );
}

export default Home;

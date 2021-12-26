import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import Main from "../../designSystem/Main";
import Error from "../../designSystem/Error";
import { Button } from "../../designSystem/input/Button";
import { ReduxState } from "../../redux";
import { SET_SELECTED_DECKS } from "../../redux/actions/selectedDecks";

const StyledMain = styled(Main)`
  position: relative;
  display: block;
  height: auto;
  margin-top: 8%;
  margin-bottom: 8%;
`;

const DeckContainer = styled.div`
  display: flex;
  align-items: center;
  padding: .1rem 0;

  > ${Button} {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    width: 100%;
  }

  :not(:first-child) {
    margin-top: 1rem;
  }
`;

const StyledDeckButton = styled(Button)<{ selected: boolean }>`
  && {
    background-color: ${({ selected }) => selected ? "#fff" : "transparent"};
    color: ${({ selected }) => selected ? "var(--primary)" : "#fff"};

    > p {
      font-size: .8rem;
      text-transform: initial;

      :hover {
        text-decoration: none !important;
      }

      :last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const ContinueButton = styled(Button)`
  margin-top: 2rem;
  margin-bottom: 5rem;
  float: right;
`;

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const players = useSelector((state: ReduxState) => state.players);
  const decks = useSelector((state: ReduxState) => state.decks);

  const [selectedDecks, setSelectedDecks] = useState(["Main"]);

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
    router.push("/play");
  }

  const DeckButton = ({ deck }) => {
    return (
      <DeckContainer key={deck.name}>
        <StyledDeckButton
          onClick={() => onClickDeck(deck.menu)}
          selected={selectedDecks.find(d => d === deck.menu) !== undefined}
        >
          {deck.menu}<br />
          {deck["back-description"].map(d => <p>{d}</p>)}
        </StyledDeckButton>
      </DeckContainer>
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
            <h3>One player</h3>
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

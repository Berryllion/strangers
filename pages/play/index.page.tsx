import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Head from "next/head";
import { ChevronLeft as ChevronLeftIcon } from 'react-feather';
import { ChevronRight as ChevronRightIcon } from 'react-feather';

import Main from "../../designSystem/Main";
import Modal from "../../designSystem/Modal";
import Error from "../../designSystem/Error";
import { Button } from "../../designSystem/input/Button";
import { ReduxState } from "../../redux";
import { SET_CARDS_AVAILABLE, SET_GAME_LEVEL, SET_GAME_LEVELS_AVAILABLE } from "../../redux/actions/game";
import { getWindowResize, useClickOutside } from "../../utils/hooks";
import Navigation from "./Navigation";
import Card from "./Card";

const LevelsButton = styled(Button)<{ selected: boolean }>`
  border: 2px solid var(--primary);
  background-color: ${({ selected }) => selected ? "var(--primary)" : "transparent"};
  color: ${({ selected }) => selected ? "#fff" : "var(--primary)"};
  padding: 1rem;
  width: 80%;

  :not(:first-child) {
    margin-top: 1rem;
  }
`;

const StyledMain = styled(Main)`
  padding: 0;
  flex-direction: column;
`;

const ClickingSides = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: start;
  z-index: 2;

  > * {
    margin-left: 2rem;
  }

  :last-of-type {
    justify-content: end;
    left: unset;
    right: 0;

    > * {
      margin-right: 2rem;
    }
  }

  @media (max-width: 640px) {
    min-width: 2.5rem;

    > * {
      display: none;
    }
  }
`;

const CardNb = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;
  text-align: center;
`;

const PlayerTurn = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-weight: bold;
`;

const Home = () => {
  const dispatch = useDispatch();
  const game = useSelector((state: ReduxState) => state.game);
  const decks = useSelector((state: ReduxState) => state.decks);
  const players = useSelector((state: ReduxState) => state.players);
  const menuRef = useRef(null);
  const { width } = getWindowResize();

  const [changingLevel, setChangingLevel] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const selectedDecks = decks.selected;
  const decksAvailable = selectedDecks.map(d => (
    decks.all.find(ad => ad.menu === d)
  ));

  const calculateGameLevelsAvailable = () => {
    let biggestNbLevels = 1;

    decksAvailable.map(d => {
      biggestNbLevels = d.levels.length > biggestNbLevels ? d.levels.length : biggestNbLevels
    })

    return biggestNbLevels;
  }

  const setLevel = gameLevel => {
    dispatch({
      type: SET_GAME_LEVEL,
      payload: gameLevel,
    });
  }

  const currentLevel = game.level;
  const nbLevels = calculateGameLevelsAvailable();
  const nbLevelArray = [...Array(nbLevels).keys()];
  const currentLevelAttribute = currentLevel < 3
    ? `level${currentLevel + 1}`
    : "finalCard";
  const currentLevelLength = game.cards[currentLevelAttribute].length;

  const getCardsAvailable = () => {
    const level1 = [];
    const level2 = [];
    const level3 = [];
    const finalCard = [];

    const shuffleArray = array => {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
    }

    decksAvailable.map(d => {
      d.level1?.map(l1 => level1.push({
        deck: d.name,
        card: l1,
      }));
      d.level2?.map(l2 => level2.push({
        deck: d.name,
        card: l2,
      }));
      d.level3?.map(l3 => level3.push({
        deck: d.name,
        card: l3,
      }));
      d["final-card"]?.map(l3 => finalCard.push({
        deck: d.name,
        card: l3,
      }));
    });

    shuffleArray(level1);
    shuffleArray(level2);
    shuffleArray(level3);
    shuffleArray(finalCard);

    return {
      level1,
      level2,
      level3,
      finalCard,
    };
  }

  const onClickLeft = () => {
    if (currentCard !== 0) {
      setCurrentCard(currentCard - 1);
      setCurrentPlayer(currentPlayer === 0
        ? players.length - 1
        : currentPlayer - 1
      );
    }
  }
  const onClickRight = () => {
    if (currentLevelLength !== currentCard + 1) {
      setCurrentCard(currentCard + 1);
      setCurrentPlayer(currentPlayer === players.length - 1
        ? 0
        : currentPlayer + 1
      );
    }
  }

  useEffect(() => {
    const allCards = getCardsAvailable();

    dispatch({
      type: SET_CARDS_AVAILABLE,
      payload: allCards,
    });
  }, []);

  useEffect(() => {
    setCurrentCard(0);
  }, [currentLevel]);

  // TODO: debounce screen resize
  useClickOutside(menuRef, setShowMenu);
  useEffect(() => {
    if (width > 640) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [width]);

  if (selectedDecks.length === 0) {
    return (
      <Main>
        <Error>
          Error: No deck(s) selected.
        </Error>
      </Main>
    )
  }

  return (
    <>
      <Head>
        <title>{"Play"}</title>
      </Head>
      <Navigation
        showMenu={showMenu}
        gameInfo={game}
        setChangingLevel={setChangingLevel}
        setShowMenu={setShowMenu}
      />
      <StyledMain>
        <PlayerTurn>
          {`${players[currentPlayer]}'s turn`}
        </PlayerTurn>

        <Card
          currentLevel={currentLevelAttribute}
          currentCard={currentCard}
          allCards={game.cards}
          decksAvailable={decksAvailable}
        />

        {/* LEFT SIDE */}
        <ClickingSides onClick={onClickLeft}>
          <ChevronLeftIcon style={{
            opacity: currentCard === 0 ? 0 : 1
          }} />
        </ClickingSides>
        {/* RIGHT SIDE */}
        <ClickingSides onClick={onClickRight}>
          <ChevronRightIcon style={{
            opacity: currentLevelLength === currentCard + 1 ? 0 : 1
          }} />
        </ClickingSides>

        {/* CARD NB */}
        <CardNb as="h4">{currentCard + 1} / {currentLevelLength}</CardNb>

        {/* LEVEL */}
        {changingLevel && (
          <Modal onClose={() => setChangingLevel(false)}>
            {/* <h2>Change level</h2>
            <Spacer height="1rem" /> */}
            <>
              {nbLevelArray.map(nb => (
                <LevelsButton
                  selected={nb === currentLevel}
                  key={nb}
                  onClick={() => setLevel(nb)}
                >
                  {nb !== 3
                  ? <>Level {nb + 1}</>
                  : "Final Card"}
                </LevelsButton>
              ))}
            </>
          </Modal>
        )}
      </StyledMain>
    </>
  );
}

export default Home;

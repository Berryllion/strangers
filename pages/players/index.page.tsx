import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Head from "next/head";

import Main from "../../designSystem/Main";
import Spacer from "../../designSystem/Spacer";
import { Button, ContinueButton } from "../../designSystem/input/Button";
import { useRouter } from "next/dist/client/router";
import { SET_PLAYERS } from "../../redux/actions/players";

const NameInput = styled.input`
  color: #fff;
  width: 100%;
  text-transform: capitalize;

  ::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  padding: 1rem 0;

  > *:first-child {
    margin: 0;
    margin-right: 1.5rem;
  }
`;

const Players = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const playersNb = players.length;

  const onNewPlayerChange = e => {
    const value = e.target.value;

    setNewPlayer(value);
  }

  const onSubmitNewPlayer = event => {
    event.preventDefault();

    if (newPlayer !== "") {
      const tmpPlayer = [...players];
      tmpPlayer.push(newPlayer);

      setNewPlayer("");
      setPlayers(tmpPlayer);
    }
  }

  const deletePlayer = index => {
    const tmpPlayer = [...players];
    tmpPlayer.splice(index, 1);

    setPlayers(tmpPlayer);
  }

  const goToNextPage = () => {
    if (playersNb === 0) return;

    dispatch({
      type: SET_PLAYERS,
      payload: players,
    });
    router.push("/decks");
  }

  return (
    <>
      <Head>
        <title>{"Players"}</title>
      </Head>
      <Main>
        <h2>Players list</h2>
        <p>Up to 6 players.</p>
        <Spacer height="1.5rem" />
        {players.length != 0 && players.map((player, i) => (
          <PlayerContainer key={player}>
            <b>{i + 1}.</b>
            <NameInput
              disabled
              placeholder="Enter player's name..."
              defaultValue={player}
            />
            <Button
              transparent
              noPadding
              onClick={() => deletePlayer(i)}
            >
              x
            </Button>
          </PlayerContainer>
        ))}
        <Spacer height="1.5rem" />
        {playersNb < 6 && (
          <PlayerContainer>
            <form onSubmit={onSubmitNewPlayer} style={{ width: "100%" }}>
              <NameInput
                placeholder="Enter player's name..."
                value={newPlayer}
                onChange={onNewPlayerChange}
              />
            </form>
          </PlayerContainer>
        )}
        <ContinueButton
          transparent
          noPadding
          disabled={playersNb === 0}
          onClick={goToNextPage}
        >
          {playersNb === 0 ? "No players" : "Continue ►"}
        </ContinueButton>
      </Main>
    </>
  );
}

export default Players;

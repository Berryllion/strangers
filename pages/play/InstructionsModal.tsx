import React from "react";
import styled from "styled-components";

import Modal from "../../designSystem/Modal";

const LevelInstructions = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
`;

const InstructionsModal = ({
  readingInstructions,
  setReadingInstructions,
}) => {
  const { levels } = require("../../decks/instruction.json");

  return (
    <>
      {readingInstructions && (
        <Modal onClose={() => setReadingInstructions(false)}>
          <h2>How to Play</h2>
          <LevelInstructions>2 players</LevelInstructions>
          <p>Pick a card. Read it out loud to your partner and listen to their answer.</p>
          <LevelInstructions>+3 players</LevelInstructions>
          <p>Pick a card. Read it out loud to a player of your choice and listen to their answer.</p>
          <p>You may not select a player that has just answered a question.</p>
          <br />
          <p>When everyone feels ready, you can go to the next level.</p>
          <br />
          <h2>Levels</h2>
          {levels.map((level, levelIndex) => (
            <React.Fragment key={levelIndex}>
              <LevelInstructions>
                {`Level ${levelIndex + 1}`}
              </LevelInstructions>
              <p>{level}</p>
            </React.Fragment>
          ))}
          <br />
          <h2>Wildcards</h2>
          <p>If you draw a <b>wildcard</b>, your partner(s) must complete the instructions unless otherwise stated.</p>
        </Modal>
      )}
    </>
  )
}

export default InstructionsModal;

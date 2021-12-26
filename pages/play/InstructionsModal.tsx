import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../designSystem/input/Button";
import Modal from "../../designSystem/Modal";
import Spacer from "../../designSystem/Spacer";

const LevelInstructions = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
`;

const InstructionsModal = ({
  readingInstructions,
  setReadingInstructions,
}) => {
  const { levels, wildcards } = require("../../decks/instruction.json");

  return (
    <>
      {readingInstructions && (
        <Modal onClose={() => setReadingInstructions(false)}>
          <h2>How to Play</h2>
          <p>Pick a card. Read it out loud to your partner(s) and listen to their answer.</p>
          <br />
          <h2>Levels</h2>
          {levels.map((level, levelIndex) => (
            <>
              <LevelInstructions>
                {`Level ${levelIndex + 1}`}
              </LevelInstructions>
              <p>{level}</p>
            </>
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

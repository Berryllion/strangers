import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "../../designSystem/input/Button";
import Modal from "../../designSystem/Modal";

const LevelsButton = styled(Button)<{ selected: boolean }>`
  border: 2px solid #fff;
  background-color: ${({ selected }) => selected ? "#fff" : "var(--primary)"};
  color: ${({ selected }) => selected ? "var(--primary)" : "#fff"};
  padding: 1rem;
  width: 80%;

  :not(:first-child) {
    margin-top: 1rem;
  }
`;

const LevelModal = ({
  changingLevel,
  setChangingLevel,
  nbLevelArray,
  currentLevel,
  setLevel,
}) => {
  return (
    <>
      {changingLevel && (
        <Modal onClose={() => setChangingLevel(false)}>
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
        </Modal>
      )}
    </>
  )
}

export default LevelModal;

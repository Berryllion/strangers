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

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

  // const setCorrectLevel = ({ levelName, levelIndex }) => {
//   if (levelName === "Final Card" || levelIndex === 4) {
  //     setLevel("finalCard");
  //   } else {
  //     setLevel(levelIndex);
  //   }
  // }

  // if (decksAvailable.length === 1) {
  //   return (
  //     <>
  //       {changingLevel && (
  //         <Modal onClose={() => setChangingLevel(false)}>
  //           <Container>
  //             {decksAvailable[0].levels.map((level, i) => (
  //               <LevelsButton
  //                 selected={i === currentLevel}
  //                 key={i}
  //                 onClick={() => setCorrectLevel({
  //                   levelName: level,
  //                   levelIndex: i,
  //                 })}
  //               >
  //                 {level}
  //               </LevelsButton>
  //             ))}
  //           </Container>
  //         </Modal>
  //       )}
  //     </>
  //   )
  // }

// TODO: better level handling
// not working for single player deck
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
          <Container>
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
          </Container>
        </Modal>
      )}
    </>
  )
}

export default LevelModal;

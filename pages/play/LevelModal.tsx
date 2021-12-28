import React from "react";
import styled from "styled-components";

import { ChoiceButton } from "../../designSystem/input/Button";
import Modal from "../../designSystem/Modal";
import { ReduxState } from "../../redux";

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
              <ChoiceButton
                key={nb}
                selected={nb === currentLevel}
                onClick={() => setLevel(nb)}
              >
                {nb !== 3
                ? <>Level {nb + 1}</>
                : "Final Card"}
              </ChoiceButton>
            ))}
          </Container>
        </Modal>
      )}
    </>
  )
}

export default LevelModal;

import { useRef } from 'react';
import styled from 'styled-components';
import { X as XIcon } from 'react-feather';

import { useClickOutside } from '../utils/hooks';
import { Button } from './input/Button';
import { useSelector } from 'react-redux';
import { ReduxState } from '../redux';

const allThemes = require("../utils/theme.json");

export const Overlay = styled.div<{
  isWildcard: boolean,
  currentTheme: {
    textColor: string,
  },
}>`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 5;
`;

const CloseButtonContainer = styled.div<{
  chosenTheme: string,
  isWildcard: boolean,
}>`
  position: absolute;
  padding: 5%;
  top: 0;
  right: 0;

  > ${Button} {
    padding: .5rem 1rem;
    color: ${({ theme, isWildcard, chosenTheme }) => isWildcard && chosenTheme !== "red"
      ? allThemes[chosenTheme].textColor
      : theme.textColor
    };
  }

  @media (max-width: 640px) {
    > ${Button} {
      padding: .4rem .5rem;
    }
  }
`;

const Content = styled.div<{
  chosenTheme: string,
  isWildcard: boolean,
}>`
  position: relative;
  background-color: ${({ theme, chosenTheme }) => chosenTheme === "black"
    ? "transparent"
    : theme.backgroundColor
  };
  color: ${({ theme, isWildcard, chosenTheme }) => isWildcard && chosenTheme !== "red"
    ? allThemes[chosenTheme].textColor
    : theme.textColor
  };
  margin: 3rem auto;
  padding: 5rem;
  width: 50%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme, isWildcard, chosenTheme }) => isWildcard
      ? allThemes[chosenTheme].textColor
      : theme.textColor
    };
    border-radius: 20px;
  }

  @media(max-width: 640px) {
    padding: 8%;
    width: 80%;
  }
`;

type ModalProps = {
  children?: JSX.Element[] | JSX.Element | string,
  onClose: () => void,
};

const Modal = ({
  children,
  onClose,
}: ModalProps) => {
  const modalContentRef = useRef(null);
  const chosenTheme = useSelector((state: ReduxState) => state.theme.chosenTheme);
  const isWildcard = useSelector((state: ReduxState) => state.theme.isWildcard);

  const currentTheme = allThemes[chosenTheme];

  useClickOutside(modalContentRef, onClose);

  return (
    <Overlay isWildcard={isWildcard} currentTheme={currentTheme}>
      <Content
        ref={modalContentRef}
        isWildcard={isWildcard}
        chosenTheme={chosenTheme}
      >
        <CloseButtonContainer
          onClick={onClose}
          isWildcard={isWildcard}
          chosenTheme={chosenTheme}
        >
          <Button transparent noPadding>
            <XIcon className="icon" />
          </Button>
        </CloseButtonContainer>
        {children}
      </Content>
    </Overlay>
  );
}

export default Modal

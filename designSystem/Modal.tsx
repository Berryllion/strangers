import { useRef } from 'react';
import styled from 'styled-components';
import { X as XIcon } from 'react-feather';

import { useClickOutside } from '../utils/hooks';
import { Button } from './input/Button';

type ModalProps = {
  children?: JSX.Element[] | JSX.Element | string,
  onClose: () => void,
};

export const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 4;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  padding: 5%;
  top: 0;
  right: 0;

  > ${Button} {
    padding: .5rem 1rem;
    color: #fff;
  }

  @media (max-width: 640px) {
    > ${Button} {
      padding: .4rem .5rem;
    }
  }
`;

const Content = styled.div`
  position: relative;
  background-color: var(--primary);
  color: #fff;
  margin: auto;
  padding: 5rem;
  width: 50%;
  overflow: auto;

  @media(max-width: 640px) {
    padding: 8%;
    width: 80%;
  }
`;

const Modal = ({
  children,
  onClose,
}: ModalProps) => {
  const modalContentRef = useRef(null);

  useClickOutside(modalContentRef, onClose);

  return (
    <Overlay>
      <Content ref={modalContentRef}>
        <CloseButtonContainer onClick={onClose}>
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

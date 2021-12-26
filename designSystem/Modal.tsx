import { constants } from 'http2';
import styled from 'styled-components';

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
    color: var(--primary);
  }

  @media (max-width: 640px) {
    > ${Button} {
      padding: .4rem .5rem;
    }
  }
`;

const Content = styled.div`
  position: relative;
  background-color: #fff;
  color: var(--primary);
  width: min-content;
  margin: auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  width: 50%;

  @media(max-width: 640px) {
    padding: 8%;
    width: 80%;
  }
`;

const Modal = ({
  children,
  onClose,
}: ModalProps) => {
  return (
    <Overlay>
      <Content>
        <CloseButtonContainer onClick={onClose}>
          <Button transparent>
            x
          </Button>
        </CloseButtonContainer>
        {children}
      </Content>
    </Overlay>
  );
}

export default Modal

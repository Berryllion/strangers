import styled from 'styled-components';

type ButtonProps = {
  backgroundColor?: string;
  textColor?: string;
  transparent?: Boolean;
  noPadding?: Boolean;
  type?: "button" | "submit";
};

export const Button = styled.button.attrs<ButtonProps>((p) => ({
  ...p,
  type: (p) => (p.type ? p.type : "button"),
}))<ButtonProps>`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  width: fit-content;
  padding: ${({ noPadding }) => noPadding ? "0" : "1rem 5rem"};
  border-radius: 5px;
  ${({ textColor }) => textColor ? `color: ${textColor};` : ""}
  ${({ backgroundColor }) => backgroundColor ? `background-color: ${backgroundColor};` : ""}
  ${({ transparent }) => transparent ? "background-color: transparent;" : ""}

  :hover {
    text-decoration: underline;
    > *, > * > * {
      text-decoration: underline;
    }
  }

  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: ${({ noPadding }) => noPadding ? "0" : "1rem 2rem"};
  }
`;

export const ContinueButton = styled(Button)`
  align-self: flex-end;
  margin-top: 2rem;

  @media (max-width: 640px) {
    margin-top: 0;
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
`;

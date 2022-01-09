import styled from 'styled-components';

type ButtonProps = {
  backgroundColor?: string;
  textColor?: string;
  transparent?: Boolean;
  noPadding?: Boolean;
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.2rem;
  width: fit-content;
  padding: ${({ noPadding }) => noPadding ? "0" : "1rem 5rem"};
  border-radius: 5px;
  color: ${({ textColor, theme }) => textColor ? textColor : theme.textColor};
  background-color: ${({ backgroundColor, theme, transparent }) => {
    if (transparent) return "transparent";
    return backgroundColor ? backgroundColor : theme.backgroundColor;
  }};

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

export const ChoiceButton = styled(Button)<{ selected: boolean }>`
  border: 2px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme, selected }) => selected ? theme.textColor : "transparent"};
  color: ${({ theme, selected }) => selected ? theme.backgroundColor : theme.textColor};
  padding: 1rem;
  width: 80%;
  transition: all 0.14s ease-out;

  :nth-of-type(1n + 2) {
    margin-top: 1.5rem;
  }
`;

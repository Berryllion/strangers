import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { SET_THEME_IS_WILDCARD } from "../../redux/actions/theme";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  z-index: 1;

  @media (max-width: 640px) {
    margin: 0 10%;
  }
`;

const StyledCard = styled.div<{
  isWildcard: boolean,
  textColor: string,
  backgroundColor?: string
}>`
  z-index: 5;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem;
  min-height: 16rem;
  height: 30vh;
  width: 30rem;
  background-color: ${({ isWildcard, backgroundColor }) => {
    return isWildcard ? backgroundColor : "#fff";
  }};
  border-radius: 50px;
  color: ${({ isWildcard, textColor }) => {
    if (textColor && !isWildcard) return textColor;
    return isWildcard ? "#fff" : "var(--primary)";
  }};
  text-transform: uppercase;
  // box-shadow from https://github.com/jonathan-lph/wnrs
  box-shadow: 0px 3px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  transition: color 0.5s ease-out, background-color 0.5s ease-out;

  h4 {
    font-size: 1.2rem;
  }

  h5 {
    position: absolute;
    bottom: 0;
    user-select: none;
  }

  @media (max-width: 820px) {
    width: 25rem;

    h4 {
      font-size: 1.1rem;
    }

    h5 {
      font-size: .7rem;
    }
  }
`;

const Card = ({ currentLevel, currentCard, allCards, decksAvailable }) => {
  const dispatch = useDispatch();

  const cardInfo = allCards[currentLevel][currentCard];
  const isWildcard = cardInfo ? cardInfo.card.startsWith("Wild Card") : false;
  const ownItRegex = /\[([^\]]+)\]\(([^)]+)\)/i;
  let question = cardInfo ? cardInfo.card : null;

  if (isWildcard)
    question = question.replace("Wild Card", "");

  useEffect(() => {
    if (isWildcard) {
      dispatch({
        type: SET_THEME_IS_WILDCARD,
        payload: true,
      });
    } else {
      dispatch({
        type: SET_THEME_IS_WILDCARD,
        payload: false,
      });
    }
  }, [isWildcard]);

  if (allCards.length === 0 || !question) return null;

  const colorWordMatch = cardInfo.card.match(ownItRegex);
  let backgroundColor = null;

  if (colorWordMatch) {
    const toReplace = colorWordMatch[0];
    const color = colorWordMatch[1];
    const word = colorWordMatch[2];

    const splitted = question.split(toReplace);

    if (isWildcard) {
      backgroundColor = color;
      question = splitted.join(word);
    } else {
      question = <>
        {splitted[0]}
        <span style={{ color }}>{word}</span>
        {splitted[1]}
      </>
    }
  }
  const currentDeck = decksAvailable.find(d => d.name === cardInfo.deck);
  const textColor = currentDeck.colors.secondary.main;
  const mainBackgroundColor = currentDeck.colors.primary.main;

  return (
    <CardContainer>
      <StyledCard
        isWildcard={isWildcard}
        textColor={textColor}
        backgroundColor={backgroundColor || mainBackgroundColor}
      >
        <h4>
          {isWildcard && <>Wild Card<br /><br /></>}
          {question}
        </h4>
        <h5>{cardInfo.deck}</h5>
      </StyledCard>
    </CardContainer>
  );
}

export default Card;

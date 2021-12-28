import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { SET_THEME_IS_WILDCARD } from "../../redux/actions/theme";
import { getWindowResize, useMousePosition } from "../../utils/hooks";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

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
  min-height: 15rem;
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
  transition: color 0.5s ease-out, background-color 0.5s ease-out, transform 0.5s ease-out;

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
  const cardRef = useRef<HTMLDivElement>(null);
  const cardAndLevelRef = useRef({ currentLevel, currentCard });
  const dispatch = useDispatch();
  const mousePos = useMousePosition();
  const windowSize = getWindowResize();

  const cardInfo = allCards[currentLevel][currentCard];
  const isWildcard = cardInfo ? cardInfo.card.startsWith("Wild Card") : false;
  const ownItRegex = /\[([^\]]+)\]\(([^)]+)\)/i;
  let question = cardInfo ? cardInfo.card : null;

  if (isWildcard)
    question = question.replace("Wild Card", "");

  useEffect(() => {
    const { white: whiteTheme } = require("../../utils/theme.json");

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

  useEffect(() => {
    if (cardAndLevelRef.current.currentCard !== currentCard || cardAndLevelRef.current.currentLevel !== currentLevel) {
      cardAndLevelRef.current = {
        currentCard,
        currentLevel,
      };
      if (cardRef.current) {
        cardRef.current.style.transform = `
          perspective(600px)
          rotateY(0deg)
          rotateX(0deg)
        `;
      }
    } else if (cardRef.current) {
      const cardBoundingRect = cardRef.current.getBoundingClientRect();
      let { x: cardX, y: cardY } = cardBoundingRect;
      cardX += cardBoundingRect.width / 2;
      cardY += cardBoundingRect.height / 2;
      const { x: mouseX, y: mouseY } = mousePos;

      cardRef.current.style.transform = `
        perspective(600px)
        rotateY(${((cardX - mouseX) / windowSize.width) * -30}deg)
        rotateX(${((cardY - mouseY) / windowSize.height) * 30}deg)
      `;
    }
  }, [mousePos]);

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
        ref={cardRef}
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

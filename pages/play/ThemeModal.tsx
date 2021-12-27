import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Button } from "../../designSystem/input/Button";
import Modal from "../../designSystem/Modal";
import { SET_THEME } from "../../redux/actions/theme";

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

const ThemeModal = ({
  changingTheme,
  setChangingTheme,
}) => {
  const dispatch = useDispatch();

  const [currentTheme, setCurrentTheme] = useState("red");

  const allThemes = require("../../utils/theme.json");

  const changeTheme = newThemeName => {
    let newTheme = allThemes[newThemeName];

    dispatch({
      type: SET_THEME,
      payload: newTheme,
    });
    setCurrentTheme(newThemeName);
  }

  return (
    <>
      {changingTheme && (
        <Modal onClose={() => setChangingTheme(false)}>
          <Container>
            {Object.keys(allThemes).map(theme => (
              <LevelsButton
                selected={theme === currentTheme}
                key={theme}
                onClick={() => changeTheme(theme)}
              >
                {theme} theme
              </LevelsButton>
            ))}
          </Container>
        </Modal>
      )}
    </>
  )
}

export default ThemeModal;

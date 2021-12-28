import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { ChoiceButton } from "../../designSystem/input/Button";
import Modal from "../../designSystem/Modal";
import { SET_THEME } from "../../redux/actions/theme";

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
    dispatch({
      type: SET_THEME,
      payload: newThemeName,
    });
    setCurrentTheme(newThemeName);
  }

  return (
    <>
      {changingTheme && (
        <Modal onClose={() => setChangingTheme(false)}>
          <Container>
            {Object.keys(allThemes).map(theme => (
              <ChoiceButton
                key={theme}
                selected={theme === currentTheme}
                onClick={() => changeTheme(theme)}
              >
                {theme} theme
              </ChoiceButton>
            ))}
          </Container>
        </Modal>
      )}
    </>
  )
}

export default ThemeModal;

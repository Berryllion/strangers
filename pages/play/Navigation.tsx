import styled from "styled-components";
import { Menu as MenuIcon } from 'react-feather';

import { Button } from "../../designSystem/input/Button";
import { useDispatch } from "react-redux";
import { SET_THEME } from "../../redux/actions/theme";
import { useState } from "react";

const StyledNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 5%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 3;

  .menuIcon {
    display: none;
    cursor: pointer;
    color: ${({ theme }) => theme.textColor};
  }

  ${Button} {
    padding: .5rem 1rem;

    :first-child {
      padding-left: 0;
    }
    :last-child {
      padding-right: 0;
    }
  }

  @media (max-width: 640px) {
    .menuIcon {
      display: block;
    }
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .separator {
    color: ${({ theme }) => theme.textColor};
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    top: 85%;

    .separator {
      display: none;
    }

    > ${Button} {
      padding-right: 0;
      padding-left: 0;
    }
  }
`;

const StyledButton = styled(Button)`
  cursor: grab;
  && {
    text-decoration: none;
  }
`;

const Navigation = ({
  showMenu,
  setChangingLevel,
  setShowMenu,
  setReadingInstructions
}) => {
  const dispatch = useDispatch();

  const [theme, setTheme] = useState("red");

  const allThemes = require("../../utils/theme.json");

  const getNextTheme = () => {
    switch (theme) {
      case "red":
        return "white";
      case "white":
        return "black";
      case "black":
        return "red";
      default:
        return "red";
    }
  }

  const changeTheme = () => {
    let newThemeName = getNextTheme();
    let newTheme = allThemes[newThemeName];

    dispatch({
      type: SET_THEME,
      payload: newTheme,
    });
    setTheme(newThemeName);
  }

  return (
    <StyledNavigation>
      <StyledButton transparent>
        STRNGRS
      </StyledButton>
      <div style={{ flexGrow: 1 }} />
      {showMenu &&
      <NavigationLinks>
        <Button transparent onClick={() => setReadingInstructions(true)}>Instructions</Button>
        <div className="separator">/</div>
        <Button transparent onClick={() => setChangingLevel(true)}>
          Change level
        </Button>
        <div className="separator">/</div>
        <Button transparent onClick={() => changeTheme()}>
          {`${getNextTheme()} theme`}
        </Button>
      </NavigationLinks>}
      <MenuIcon className="menuIcon" onClick={() => setShowMenu(!showMenu)} />
    </StyledNavigation>
  );
}

export default Navigation;

import styled from "styled-components";
import { Menu as MenuIcon } from 'react-feather';

import { Button } from "../../designSystem/input/Button";

const StyledNavigation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 3rem;
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
    text-shadow: ${({ theme }) => `
      -1px -1px 0 ${theme.backgroundColor},
      1px -1px 0 ${theme.backgroundColor},
      -1px 1px 0 ${theme.backgroundColor},
      1px 1px 0 ${theme.backgroundColor}
    `};
    transition: text-shadow 0.5s ease-out;

    :first-child {
      padding-left: 0;
    }
    :last-child {
      padding-right: 0;
    }
  }

  @media (max-width: 820px) {
    padding: 2rem;

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

  @media (max-width: 820px) {
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
  setReadingInstructions,
  setChangingTheme,
  setShowMenu,
}) => {
  return (
    <StyledNavigation>
      <StyledButton transparent>
        STRNGRS
      </StyledButton>
      <div style={{ flexGrow: 1 }} />
      {showMenu &&
      <NavigationLinks>
        <Button transparent onClick={() => setReadingInstructions(true)}>
          Instructions
        </Button>
        <div className="separator">/</div>
        <Button transparent onClick={() => setChangingLevel(true)}>
          Change level
        </Button>
        <div className="separator">/</div>
        <Button transparent onClick={() => setChangingTheme(true)}>
          Change theme
        </Button>
      </NavigationLinks>}
      <MenuIcon
        className="menuIcon icon"
        onClick={() => setShowMenu(!showMenu)}
      />
    </StyledNavigation>
  );
}

export default Navigation;

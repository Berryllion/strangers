import styled from "styled-components";
import { Menu as MenuIcon } from 'react-feather';
import { useRouter } from "next/dist/client/router";

import { Button } from "../../designSystem/input/Button";

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

  > select {
    font-size: 1.2rem;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;

    > option {
      text-transform: initial;
      color: #000;
    }
  }

  @media (max-width: 640px) {
    .menuIcon {
      display: block;
    }

    > select {
      font-size: 1rem;
    }
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;


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

const Navigation = ({ showMenu, gameInfo, setChangingLevel, setShowMenu }) => {
  const router = useRouter();

  return (
    <StyledNavigation>
      <Button onClick={() => router.push("/")}>
        WNRS
      </Button>
      <div style={{ flexGrow: 1 }} />
      {showMenu &&
      <NavigationLinks>
        <Button>Instructions</Button>
        <div className="separator">/</div>
        <Button onClick={() => setChangingLevel(true)}>
          {gameInfo.level !== 3
          ? <>Level {gameInfo.level + 1}</>
          : "Final Card"}
        </Button>
      </NavigationLinks>}
      <MenuIcon className="menuIcon" onClick={() => setShowMenu(!showMenu)} />
    </StyledNavigation>
  );
}

export default Navigation;

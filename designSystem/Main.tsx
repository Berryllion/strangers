import styled from "styled-components";

type MainProps = {
  height?: string;
}

const Main = styled.div<MainProps>`
  margin: 0;
  padding: 0 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: ${({ height }) => height ? height : "100vh"};

  @media(max-width: 640px) {
    padding: 8%;
    margin: 0;
  }
`;

export default Main;

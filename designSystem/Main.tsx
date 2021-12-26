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
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  transition: color 0.5s ease-out, background-color 0.5s ease-out;

  a {
    color: ${({ theme }) => theme.textColor};
  }

  @media(max-width: 640px) {
    padding: 8%;
    margin: 0;
  }
`;

export default Main;

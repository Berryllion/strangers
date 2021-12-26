import styled from 'styled-components';

type SpacerProps = {
  height?: string;
  width?: string;
};

const Spacer = styled.div<SpacerProps>`
  ${({ height }) => height ? `height: ${height};` : "" };
  ${({ width }) => width ? `width: ${width};` : "" };
`;

export default Spacer;

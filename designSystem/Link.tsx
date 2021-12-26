import styled from 'styled-components';
import Link from "next/link";

type LinkProps = {
  color?: string;
};

const StyledLink = styled(Link)<LinkProps>`
  color: ${({ color }) => color ? color : "#fff"}
`;

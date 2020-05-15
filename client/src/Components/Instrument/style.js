import styled from "styled-components";

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
`;

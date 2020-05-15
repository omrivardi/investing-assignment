import styled from "styled-components";

export const InstrumentList = styled.div`
  width: 40vw;
  margin-bottom: 3em;
`;

export const Row = styled.div`
  display: flex;
`;

export const Col = styled.div`
  flex: ${(props) => props.size};
  font-weight: 800;
  margin-bottom: 1em;
`;
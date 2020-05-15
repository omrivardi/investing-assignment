import React from "react";
import { Button } from "antd";
import { Row, Col } from "./style";

const Instrument = ({ data, action, onAction }) => {
  return (
    <Row>
      <Col size={1.5}>{data.name}</Col>
      <Col size={1}>{data.symbol}</Col>
      <Col size={1}>{data.instrumentType}</Col>
      <Col size={1}>
        {action && <Button onClick={() => onAction(data)}>{action}</Button>}
      </Col>
    </Row>
  );
};

export default Instrument;

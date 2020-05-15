import React, { useState } from "react";
import { Button, Modal } from "antd";

import { ACTION_TYPE } from "../../consts";
import Instrument from "../Instrument";
import { InstrumentList, Row, Col } from "./style";

const allInstruments = [
  {
    instrumentId: 1,
    name: "Euro US Dollar",
    symbol: "EUR/USD",
    instrumentType: "currency",
  },
  {
    instrumentId: 10,
    name: "Euro Swiss Franc",
    symbol: "EUR/CHF",
    instrumentType: "currency",
  },
  {
    instrumentId: 9,
    name: "Euro Japanese Yen",
    symbol: "EUR/JPY",
    instrumentType: "currency",
  },
  {
    instrumentId: 956731,
    name: "Investing.com Euro Index",
    symbol: "inveur",
    instrumentType: "indice",
  },
  {
    instrumentId: 2124,
    name: "US Dollar Euro",
    symbol: "USD/EUR",
    instrumentType: "currency",
  },
  {
    instrumentId: 976573,
    name: "Sygnia Itrix Euro Stoxx 50 ETF",
    symbol: "SYGEUJ",
    instrumentType: "etf",
  },
  {
    instrumentId: 997393,
    name: "NewWave EUR Currency Exchange Traded Note",
    symbol: "NEWEURJ",
    instrumentType: "etf",
  },
  {
    instrumentId: 998227,
    name: "Diesel European Gasoil Futures",
    symbol: "DSEL1c1",
    instrumentType: "commodity",
  },
  {
    instrumentId: 175,
    name: "Euro Stoxx 50",
    symbol: "STOXX50",
    instrumentType: "indice",
  },
  {
    instrumentId: 15978,
    name: "Euronet Worldwide Inc",
    symbol: "EEFT",
    instrumentType: "equities",
  },
  {
    instrumentId: 6,
    name: "Euro British Pound",
    symbol: "EUR/GBP",
    instrumentType: "currency",
  },
  {
    instrumentId: 15,
    name: "Euro Australian Dollar",
    symbol: "EUR/AUD",
    instrumentType: "currency",
  },
  {
    instrumentId: 16,
    name: "Euro Canadian Dollar",
    symbol: "EUR/CAD",
    instrumentType: "currency",
  },
  {
    instrumentId: 52,
    name: "Euro New Zealand Dollar",
    symbol: "EUR/NZD",
    instrumentType: "currency",
  },
  {
    instrumentId: 1487,
    name: "Australian Dollar Euro",
    symbol: "AUD/EUR",
    instrumentType: "currency",
  },
  {
    instrumentId: 1525,
    name: "Canadian Dollar Euro",
    symbol: "CAD/EUR",
    instrumentType: "currency",
  },
];

const Header = () => (
  <Row>
    <Col size={1.5}>Name</Col>
    <Col size={1}>Symbol</Col>
    <Col size={1}>Type</Col>
    <Col size={1} />
  </Row>
);
const MyList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [instruments, setInstruments] = useState([]);

  const removeInstrument = (instrument) => {
    setInstruments((prev) =>
      prev.filter((i) => i.instrumentId !== instrument.instrumentId)
    );
  };

  const addInstrument = (instrument) => {
    setInstruments((prev) => prev.concat(instrument));
  };

  const instrumentsId = instruments.map(
    (instrument) => instrument.instrumentId
  );

  const availableInstruments = allInstruments.filter(
    (instrument) => !instrumentsId.includes(instrument.instrumentId)
  );

  return (
    <>
      {instruments.length ? (
        <InstrumentList>
          <Header />
          {instruments.map((instrument) => (
            <Instrument
              key={instrument.instrumentId}
              data={instrument}
              action={ACTION_TYPE.REMOVE}
              onAction={removeInstrument}
            />
          ))}
        </InstrumentList>
      ) : (
        <p>You don't have any instruments now.</p>
      )}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add
      </Button>
      <Modal
        title="Add Instrument"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <>
          {availableInstruments.length ? (
            <InstrumentList>
              <Header />
              {availableInstruments.map((instrument) => (
                <Instrument
                  key={instrument.instrumentId}
                  data={instrument}
                  action={ACTION_TYPE.ADD}
                  onAction={addInstrument}
                />
              ))}
            </InstrumentList>
          ) : (
            <p>There are no available instruments.</p>
          )}
        </>
      </Modal>
    </>
  );
};

export default MyList;

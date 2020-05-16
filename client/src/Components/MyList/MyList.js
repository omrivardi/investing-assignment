import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import Axios from "axios";
import { ACTION_TYPE } from "../../consts";
import Instrument from "../Instrument";
import { InstrumentList, Row, Col, Search } from "./style";

const baseUrl = process.env.REACT_APP_BASE_URL;
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
  const [allInstruments, setAllInstruments] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    Axios.get(`${baseUrl}/instruments`).then((res) =>
      setAllInstruments(res.data)
    );
  }, []);

  useEffect(() => {
    Axios.get(`${baseUrl}/list`).then((res) => setInstruments(res.data));
  }, []);

  const removeInstrument = (instrument) => {
    Axios.delete(`${baseUrl}/list/${instrument._id}`, instrument).then(
      (res) => {
        setInstruments((prev) => prev.filter((i) => i._id !== instrument._id));
      }
    );
  };

  const addInstrument = (instrument) => {
    let instrumentToAdd = { ...instrument, _id: instrument.instrumentId };
    delete instrumentToAdd.instrumentId;
    Axios.post(`${baseUrl}/list`, instrumentToAdd).then((res) => {
      setInstruments((prev) => prev.concat(instrumentToAdd));
    });
  };

  const instrumentsId = instruments.map((instrument) => instrument._id);

  const availableInstruments = allInstruments.filter(
    (instrument) =>
      !instrumentsId.includes(instrument.instrumentId) &&
      instrument.name.toLowerCase().includes(searchFilter.toLocaleLowerCase())
  );

  return (
    <>
      {instruments.length ? (
        <InstrumentList>
          <Header />
          {instruments.map((instrument) => (
            <Instrument
              key={instrument._id}
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
          <Search
            placeholder="Search by name"
            onSearch={(value) => setSearchFilter(value)}
            onPressEnter={(e) => setSearchFilter(e.target.value)}
            enterButton
          />
          {availableInstruments.length ? (
            <InstrumentList>
              <Header />
              {availableInstruments.map((instrument) => (
                <Instrument
                  key={instrument._id}
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

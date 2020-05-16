const express = require("express");
const { connect } = require("./db");
const { instrumentsCollectionName, listCollectionName } = require("./consts");

const router = express.Router();

const checkForKeys = (obj, keys) => {
  let valid = true;
  if (!obj || typeof obj !== "object") {
    return false;
  }
  keys.forEach((key) => {
    if (obj[key] === undefined) {
      valid = false;
    }
  });

  return valid;
};

router.get("/instruments", async (req, res) => {
  const db = await connect();
  const instruments = await db
    .collection(instrumentsCollectionName)
    .find()
    .toArray();
  res.send(instruments);
});

router.get("/list", async (req, res) => {
  const db = await connect();
  const list = await db.collection(listCollectionName).find().toArray();
  res.send(list);
});

router.post("/list", async (req, res) => {
  const db = await connect();
  if (!checkForKeys(req.body, ["_id", "name", "symbol", "instrumentType"])) {
    res.status(400).send("Bad Request");
  }
  try {
    const insertResult = await db
      .collection(listCollectionName)
      .insertOne(req.body);
    if (insertResult.insertedCount === 1) {
      res.send("ok");
    } else {
      res.status(500).send();
    }
  } catch (err) {
    if (err.errmsg.includes("duplicate key")) {
      res.status(400).send("Duplicate key");
    } else {
      res.status(500).send("Internal error");
    }
  }
});

router.delete("/list/:id", async (req, res) => {
  const db = await connect();
  const id = req.params.id;
  if (!id) {
    res.status(400).send("Bad Request");
  }
  try {
    const deleteResult = await db
      .collection(listCollectionName)
      .deleteOne({ _id: parseInt(id) });

    if (deleteResult.deletedCount === 1) {
      res.status(200).send("ok");
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;

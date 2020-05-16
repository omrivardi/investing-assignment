const { MongoClient } = require("mongodb");

const allInstruments = require("../../data/instruments.json");
const { url, instrumentsCollectionName } = require("./consts");

let client = null;
let db = null;
const connect = async () => {
  if (!db) {
    client = await MongoClient.connect(url);
    db = client.db(process.env.DB_NAME);
  }

  return db;
};

const close = async () => {
  if (client) {
    return client.close();
  }
};

const initDb = async () => {
  try {
    const instrumentsAmount = await db
      .collection(instrumentsCollectionName)
      .find()
      .count();

    if (instrumentsAmount === 0) {
      await db.collection(instrumentsCollectionName).insertMany(allInstruments);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initDb, connect, close };

const { promisify } = require("util");
const Datastore = require("nedb");
const allInstruments = require("./data/instruments.json");

const db = {};
db.instruments = new Datastore();
const insertAsync = promisify(db.instruments.insert);
allInstruments.map((instrument) => db.instruments.insert());
const db = new Datastore({ filename: ".data/list", autoload: true });

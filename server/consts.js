const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSROWD}@localhost:${process.env.DB_PORT}`;
const instrumentsCollectionName = "instruments";
const listCollectionName = "list";

module.exports = {
  url,
  instrumentsCollectionName,
  listCollectionName
};

const mongooes = require("mongoose");
require("dotenv").config();

module.exports = () =>
  mongooes.connect(
    `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_PASS}@cluster0.nwbzgiz.mongodb.net/dog`
  );
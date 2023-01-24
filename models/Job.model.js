const mongoose = require("mongoose");

module.exports = mongoose.model(
  "job",
  new mongoose.Schema({
    company_name: { type: String, required: true },
    position: { type: String, required: true },
    contract: { type: String, required: true },
    location: { type: String, required: true },
  })
);

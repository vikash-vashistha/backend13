const mongoose = require("mongoose");

module.exports = mongoose.model(
  "cart",
  new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
    job_id: { type: mongoose.Schema.Types.ObjectId, ref: "job" },
  })
);

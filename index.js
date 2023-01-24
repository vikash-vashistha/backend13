const express = require("express");
const connection = require("./utils/db");
const cors = require("cors");
const authController = require("./controllers/Auth.controller")
const cartController = require("./controllers/Cart.controller")
const jobController = require("./controllers/Job.controller")

const app = express();
app.use(express.json());
app.use(cors())

app.use("/auth", authController);
app.use("/job", jobController);
app.use("/cart", cartController);


const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    connection();
    console.log("connnected to db cat");
  } catch (e) {
    console.log(e.message);
  }
  console.log("Listening on port 8000");
});
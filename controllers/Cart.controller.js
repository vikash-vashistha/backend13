const express = require("express");
const Cart = require("../models/Cart.model");
const Authentication = require("../middlewares/Authentication");

const router = express.Router();

router.post("/", Authentication, async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    let obj = {
     user_id: req.user._id, job_id: id
   }
    const item = await Cart.create(obj);
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/", Authentication, async (req, res) => {
  console.log("req", req.user, req.body);
  try {
    const item = await Cart.find({
      user_id: req.user._id,
    })
      .populate(["user_id", "job_id"])
      .lean()
      .exec();
    console.log(item);
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;

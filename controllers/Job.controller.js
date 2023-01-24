const express = require("express");
const Job = require("../models/Job.model");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const item = await Job.create(req.body);
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
})

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body, id);
  try {
    const item = await Job.findOneAndUpdate({_id: id, ...req.body});
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("vik", id);
  try {
    const item = await Job.deleteOne({ id });
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/", async (req, res) => {
  try {
    let item;
    let { id } = req.query;
    // console.log(city);
    if (id) {
      item = await Location.find({ company_name: new RegExp(id, "i") })
        .lean()
        .exec();
      // console.log(Cities, req.query.city);
    } else {
      item = await Job.find()
        .lean()
        .exec();
    }
    console.log(item);
    return res.status(200).send(item);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;

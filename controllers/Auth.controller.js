require("dotenv").config();
const express = require("express");
const Auth = require("../models/Auth.model");
const router = express.Router();

// password Hashing
const bcrypt = require("bcrypt");

// token creation
const jwt = require("jsonwebtoken");

// Authentication middleware
const Authentication = require("../middlewares/Authentication");

// Register Routes
router.post("/register", (req, res) => {
  const { password } = req.body;
  try {
    const myPlaintextPassword = password;
    const saltRounds = 10;
    bcrypt.hash(myPlaintextPassword, saltRounds, async function (err, hash) {
      // Store hash in your password DB.
      if (err) res.status(500).send(err);
      req.body.password = hash;
      // const user = await new Auth(req.body);
      // // console.log(user);
      // await user.save();
      const user = await Auth.create(req.body);
      return res.status(200).send("user successfully saved");
    });
  } catch (e) {
    // console.log(e);
    return res.status(500).send("Error");
  }
});



// Login Routes
router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    // get user with email
    const user = await Auth.findOne({ email });
    const hash = user.password;
    const myPlaintextPassword = password;
    // console.log(hash, myPlaintextPassword);
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      // result == true
      if (err) return res.status(400).send(err);
      if (result) {
        const privateKey = process.env.JWT_SECRET_KEY;
        jwt.sign(
          {user},
          privateKey,
          function (err, token) {
            if (err) return res.status(400).send(err);
            // console.log(token);
            if(token) return res.status(200).send({ user, token });
          }
        );
      }
    });
  } catch (e) {
    // console.log(e);
    return res.status(500).send("Error");
  }
});


// get user
router.get("/user", Authentication, async (req, res) => {
  console.log(req.user);
  try {
   return res.status(200).send(req.user)
  } catch (e) {
    // console.log(e);
    return res.status(500).send("Error");
  }
});

module.exports = router;

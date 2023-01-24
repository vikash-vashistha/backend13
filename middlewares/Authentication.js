// token creation
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // console.log(req.body, req.headers.authorization);
  if (!req.headers.authorization)
    return res
      .status(400)
      .send({ message: "authorization token is not provided" });

  if (!req.headers.authorization.startsWith("Bearer "))
    return res.send({ message: "token is not valid" });

  const token = req.headers.authorization.split(" ")[1];
console.log("token:", token);
  try {
    const privateKey = process.env.JWT_SECRET_KEY;
    jwt.verify(token, privateKey, function (err, decoded) {
      if (err) return res.status(400).send(err);
      else {
        req.user = decoded.user;
        // console.log("bar", decoded.user); // bar
      }
    });
  } catch (e) {
    return res.status(400).send({ message: "token not valid" });
  }
  return next();
};

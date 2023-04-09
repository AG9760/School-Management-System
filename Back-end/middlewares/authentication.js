const jwt = require("jsonwebtoken");
const config = require("../config/authconfig");

module.exports = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, config.secret);
  } catch (err) {
    res.status(500).send({ message: "Some problem in authentication" });
    return;
  }

  if (!decodedtoken) {
    res.status(400).send({ message: "Invalid token" });
    return;
  }
  req.role = decodedtoken.role;
  req.userid = decodedtoken.id;
  next();
};

const express = require("express");

const router = express.Router();
const usercontroller = require("../controllers/user");

router.post("/adduser", usercontroller.adduser);

module.exports = router;

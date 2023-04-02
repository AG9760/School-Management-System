const express = require("express");
const auth = require("../middlewares/authentication");

const router = express.Router();
const usercontroller = require("../controllers/user");

// router.post("/adduser", usercontroller.adduser);

router.get("/dummy", auth, usercontroller.dummy);

module.exports = router;

const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth");
const usercontroller = require("../controllers/user");
const checkAuth = require("../middlewares/check_auth");

router.post("/adduser", authcontroller.adduser);
router.post("/login", authcontroller.login);
router.post("/addstudent", authcontroller.addstudent);
router.get("/AllUsers", authcontroller.getUsers);
router.get("/:id", authcontroller.getUser);
router.put("/:id", authcontroller.editUser);
router.put("/InActive/:id", authcontroller.ActiveInactiveUser);
router.post("/email-send", authcontroller.emailSend);
router.post("/change-password", authcontroller.changePassword);
// router.get("/otp-verify/:email", authcontroller.getOtpverify);
router.get("/otp-verify", authcontroller.otpverify);
router.post("/logout", authcontroller.logout);
router.post("/addnotes", authcontroller.addnotes);
router.get("/shownotes", authcontroller.shownotes);

module.exports = router;

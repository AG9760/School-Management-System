const md5 = require("md5");
const User = require("../models/user");

exports.adduser = (req, res, next) => {
  console.log("in add user");
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);

    const user = new User({
      username: name,
      email: email,
      password: md5(password),
    });
    user.save();
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
  //   user.save((err, user) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     console.log(user);
  //   });
};

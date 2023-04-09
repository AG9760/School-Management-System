const md5 = require("md5");
const User = require("../models/user");
// const Student = require("../models/addstudent_0");
const Student = require("../models/addstudent");
const Otp = require("../models/otp");
const notes = require("../models/addnotes");
const jwt = require("jsonwebtoken");
const config = require("../config/authconfig");

exports.adduser = (req, res, next) => {
  console.log("in add user");
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);

    const user = new User({
      name: name,
      email: email,
      password: md5(password),
      role: "Student",
    });
    user.save().then((user) => {
      console.log(user);
    });
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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email, password: md5(password) }).then((user) => {
    if (user) {
      const data = {
        id: user._id,
        role: user.role,
      };
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        config.secret,
        { expiresIn: 43200 }
      );
      console.log(token);
      // localStorage.setItem("user", user);
      res.status(200).send({
        message: "login success",
        token: token,
        role: user.role,
        data: data,
      });
    }
  });

  Student.findOne({ email: email, password: password }).then((user) => {
    if (user) {
      const data = {
        id: user._id,
        role: "Student",
      };
      const token = jwt.sign(
        {
          id: user._id,
          role: "Student",
        },

        config.secret,
        { expiresIn: 43200 }
      );
      // console.log(token);
      // localStorage.setItem("token", token);
      res
        .status(200)
        .send({ message: "login success", token: token, data: data });
    }
  });
};

exports.addstudent = (req, res, next) => {
  console.log("in add student");
  try {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const password = req.body.password;
    const rollNo = req.body.rollNo;
    const dob = req.body.dob;
    console.log(name, username, email, phone, gender, password, rollNo, dob);

    const user = new Student({
      name: name,
      username: username,
      email: email,
      phone: phone,
      gender: gender,
      password: password,
      rollNo: rollNo,
      dob: dob,
      isActive: true,
    });
    user.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.getUsers = (req, res) => {
  try {
    Student.find().then((users) => {
      console.log(users);
      res
        .status(200)
        .send({ message: "Response sending succesfully", user: users });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getUser = (req, res) => {
  console.log("in get user", req.params.id);
  try {
    Student.find({ _id: req.params.id }).then((users) => {
      // console.log(users);
      res
        .status(200)
        .send({ message: "Response sending succesfully", user: users });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  // res.status(200).send({ message: "ignore" });
};

exports.editUser = async (req, res) => {
  let user = req.body;
  const editUser = new Student(user);

  try {
    await Student.updateOne({ _id: req.params.id }, editUser);
    res.status(201).json(editUser);
  } catch (error) {
    // console.log("i  m  at error)");
    res.status(409).json({ message: error.message });
  }
};

exports.ActiveInactiveUser = async (req, res) => {
  let user = { isActive: req.body.flag };

  try {
    await Student.updateOne({ _id: req.params.id }, user);
    res.status(201).json(user);
  } catch (error) {
    // console.log("i  m  at error)");
    res.status(409).json({ message: error.message });
  }
};

exports.emailSend = async (req, res) => {
  console.log("here", req.body);
  let data = await Student.findOne({ email: req.body.email });
  console.log(data);
  const responseType = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    let otpData = new Otp({
      email: req.body.email,
      code: otpcode,
      expireIn: new Date().getTime() + 300 * 1000,
    });
    // mailer(req.body.email, otpcode);
    let otpResponse = await otpData.save();
    console.log(otpcode, otpResponse);
    responseType.statusText = "success";
    responseType.message = "please check your email id";
  } else {
    responseType.statusText = "error";
    responseType.message = "email id not exist";
  }
  res.status(200).json(responseType);
};

// const mailer = (email, otp) => {
//   var nodemailer = require("nodemailer");
//   var transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 587,
//     secure: false,
//     auth: {
//       user: "anshikag992@gmail.com",
//       pass: "anshika@9760",
//     },
//   });

//   var mailOptions = {
//     from: "anshikag992@gmail.com",
//     to: "takmanoj369@gmail.com",
//     subject: "sending email using NodeJs",
//     text: "Thank Yor!",
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("email send : " + info.response);
//     }
//   });
// };

exports.changePassword = async (req, res) => {
  let data = await Otp.findOne({
    email: req.body.email,
    code: req.body.inputField.otp,
  });
  console.log("hello", req.body.email, req.body.inputField.otp);

  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) {
      response.message = "token expired";
      response.statusText = "error";
    } else {
      let user = await Student.findOne({ email: req.body.email });
      await Student.updateOne(
        { email: req.body.email },
        { password: req.body.inputField.password }
      );
      // user.password = req.body.password;
      // user.save();
      response.message = "password changes successfully";
      response.statusText = "success";
    }
  } else {
    response.message = "invalid otp";
    response.statusText = "error";
  }
  res.status(200).json(response);
};

exports.otpverify = (req, res) => {
  console.log(req.params.email);
  const OTP = req.body.otp;

  Otp.findOne({ email: req.params.email }).then((doc) => {
    let code = doc.code;

    if (code === OTP) {
      res.status(200).send({ message: "OTP verified successfully" });
    } else {
      res.status(400).send({ message: "Verification failed" });
    }
  });
};

exports.logout = (req, res) => {
  console.log("hello my logout page");
  res.clearCookie("jwttoken");
  res.status(200).send({ message: "user logged out" });
};

exports.addnotes = (req, res, next) => {
  console.log("in add notes");
  try {
    const std_class = req.body.std;
    const subject = req.body.subject;
    const filename = req.body.filename;
    const comment = req.body.comment;
    console.log(std_class, subject, filename, comment);

    const notes_data = new notes({
      std: std_class,
      subject: subject,
      filename: filename,
      comment: comment,
    });
    notes_data.save().then((user) => {
      console.log(user);
    });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.shownotes = (req, res) => {
  // try {
  //   notes.find().then((notes) => {
  //     // console.log(users);
  //     res
  //       .status(200)
  //       .send({ message: "Response sending succesfully", notes: notes });
  //   });
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
  res.status(200).send({ message: "ignore" });
};

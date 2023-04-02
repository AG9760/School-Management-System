const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userroutes = require("./routes/user");
const User = require("./models/user");
const Admin = require("./models/admin");
const md5 = require("md5");
const authroutes = require("./routes/auth");
const AddStudent = require("./models/addstudent_0");
// const addstudent = require("./routes/addstudent");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});
app.use(bodyParser.json());
app.use(userroutes);
app.use(authroutes);
// app.use(addstudent);

app.post("/login", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.send({ message: "User not found" });
      }
      if (password === user.password) {
        res.send({ message: "login successful" });
      } else {
        res.send({ message: "login failed" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        const user = new User({ name, email, password: md5(password) });
        user.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.post("/AdminLogin", (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   Admin.findOne({ email: email })
//     .then((admin) => {
//       console.log(admin);
//       if (!admin) {
//         res.send({ message: "Admin not found" });
//       }
//       if (password === admin.password) {
//         res.send({ message: "login successful" });
//       } else {
//         res.send({ message: "login failed" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.post("/AdminRegister", (req, res) => {
//   const { adminKey, name, email, password } = req.body;
//   Admin.findOne({ email: email })
//     .then((admin) => {
//       console.log(admin);
//       if (!admin) {
//         const admin2 = new Admin({
//           adminKey,
//           name,
//           email,
//           password: md5(password),
//         });
//         admin2.save();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

mongoose
  .connect("mongodb://localhost:27017/myRegisterLoginDB")
  .then((result) => {
    app.listen(8080);
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Some error ocurred");
    console.log(err);
  });

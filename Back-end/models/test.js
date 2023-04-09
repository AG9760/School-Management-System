const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentTestSchema = new Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  isActive: Boolean,
});
studentTestSchema.add({
  password: String,
  RollNo: String,
  dob: String,
  gender: String,
});
module.exports = mongoose.model("StudentTest", studentTestSchema);

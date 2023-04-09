const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  isActive: Boolean,
});
studentSchema.add({
  password: String,
  rollNo: String,
  dob: String,
  gender: String,
});
module.exports = mongoose.model("Student1", studentSchema);

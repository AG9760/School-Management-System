const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  username: String,
  email: String,
  phone: String,
  isActive: Boolean,
});

module.exports = mongoose.model("Student", studentSchema);

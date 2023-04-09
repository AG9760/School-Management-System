const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  std: String,
  subject: String,
  filename: String,
  comment: String,
});
module.exports = mongoose.model("notes", notesSchema);

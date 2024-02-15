const mongoose = require("mongoose");

const schema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

const userModel = mongoose.model("user", schema);

module.exports = userModel;

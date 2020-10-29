const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
  },
  name: {
    type: String,
    minlength: 6,
    maxlength: 50,
  },
});

const Users = mongoose.model("User", loginSchema);

module.exports.Users = Users;
module.exports.schema = loginSchema;

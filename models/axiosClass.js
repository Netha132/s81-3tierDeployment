let mongoose = require("mongoose");

let axiosSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  gender: String,
  email: String,
  mobile: Number,
  password: String,
  profile: String,
});

let axiosClass = new mongoose.model("axios", axiosSchema, "axiosUsers");

module.exports = axiosClass;

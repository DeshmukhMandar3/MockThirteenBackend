const mg = require("mongoose");

const userSchema = mg.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const userModel = mg.model("user", userSchema);

module.exports = userModel;

const mg = require("mongoose");

const aptSchema = mg.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  sp: { type: String, required: true },
  exp: { type: Number, required: true },
  loc: { type: String, required: true },
  date: String,
  slots: { type: Number, required: true },
  fee: { type: Number, required: true },
});

const aptModel = mg.model("appointment", aptSchema);

module.exports = aptModel;
